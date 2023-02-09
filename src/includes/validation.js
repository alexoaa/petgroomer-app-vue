import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
} from "vee-validate";
import {
  required,
  alpha_spaces as alphaSpaces,
  email,
  max,
  min,
  confirmed,
  integer,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("alphaSpaces", alphaSpaces);
    defineRule("email", email);
    defineRule("max", max);
    defineRule("min", min);
    defineRule("confirmed", confirmed);
    defineRule("integer", integer);
  },
};
