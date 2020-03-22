"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (input, patterns) => {
    patterns.forEach(p => {
        if (!p)
            return;
        input = input.split(p.from).join(p.to);
    });
    return input;
};
