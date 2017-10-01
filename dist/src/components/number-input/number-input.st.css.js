
Object.defineProperty(exports, "__esModule", { value: true });
require("../../style/project.st.css");
require("../stepper/stepper.st.css");
module.exports.default = require("stylable/runtime").create(
    "root",
    "numberinput4185253616",
    {"root":"numberinput4185253616--root","prefix":"numberinput4185253616--prefix","suffix":"numberinput4185253616--suffix","native-input":"numberinput4185253616--native-input","stepper":"numberinput4185253616--stepper"},
    ".numberinput4185253616--root {\n    -st-states: focus, disabled, error;\n\n    box-sizing: inherit;\n    position: relative;\n    display: inline-flex;\n\n    border: solid 1px #d1d1d1;\n    border-radius: 0px;\n    background-color: #ffffff;\n    color: #000000;\n\n    height: 36px;\n    min-width: 192px;\n}\n\n.numberinput4185253616--root:hover {\n    border: solid 1px #5cb4ff;\n}\n\n.numberinput4185253616--root[data-numberinput4185253616-focus] {\n    border: solid 1px #4990e2;\n}\n\n.numberinput4185253616--root[data-numberinput4185253616-disabled] {\n    background-color: #f1f1f1;\n    color: #577083;\n    border: solid 1px #d1d1d1;\n}\n\n.numberinput4185253616--root[data-numberinput4185253616-error] {\n    border: solid 1px #d0011b;\n}\n\n.numberinput4185253616--root .numberinput4185253616--prefix {\n    display: flex;\n    align-items: center;\n}\n\n.numberinput4185253616--root .numberinput4185253616--suffix {\n    display: flex;\n    align-items: center;\n}\n\n.numberinput4185253616--root .numberinput4185253616--native-input {\n    flex-grow: 1;\n\n    height: auto;\n    border: none;\n    box-shadow: none;\n    outline: none;\n\n    background: none;\n\n    -moz-appearance: textfield;\n}\n\n.numberinput4185253616--root .numberinput4185253616--native-input::-webkit-outer-spin-button,\n.numberinput4185253616--root .numberinput4185253616--native-input::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n}\n.numberinput4185253616--root .numberinput4185253616--native-input:disabled {\n    background: inherit;\n}\n\n.numberinput4185253616--root .numberinput4185253616--stepper.stepper1417505954--root {\n    -st-extends: stepper;\n    height: auto;\n}\n",
    module.id
);
