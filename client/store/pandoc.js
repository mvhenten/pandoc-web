"use strict";

let Observers = new Set();

let State = {
    set: (key, value) => {
        let state = Object.assign(State.values, {[key]: value});
        sessionStorage.setItem("pandoc", JSON.stringify(state));
    },
    
    get values() {
        let state = sessionStorage.getItem("pandoc");
        if (state) return JSON.parse(state);
        return {};
    }
};

function formatOptions(options, selected) {
    return options.map((option) => {
        return {
            selected: option == selected,
            title: option,
            value: option
        };
    });
}

const Store = module.exports = {
    observe: Observers.add.bind(Observers),

    stopObserving: Observers.delete.bind(Observers),

    set: (key, value) => {
        State.set(key, value);
        Observers.forEach((fn) => fn(Store.state));
    },

    get state() {
        return State.values;
    },
    
    get inputOptions() {
        let {
            formats
        } = State.values;
        if (!formats) return [];
        return formatOptions(formats.input, "markdown");
    },

    get outputOptions() {
        let {
            formats
        } = State.values;
        if (!formats) return [];
        return formatOptions(formats.output, "mediawiki");
    }
};