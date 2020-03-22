"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (p) => {
    if (!p || !p.includes('=>'))
        return undefined;
    const s = p.split('=>');
    if (s.length != 2)
        return undefined;
    const pattern = { from: s[0].trim(), to: s[1].trim() };
    if (!pattern.from || !pattern.to)
        return undefined;
    return pattern;
};
