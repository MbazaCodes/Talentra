import { T as reactExports, K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { a4 as toast } from "./router-CHXEIgg2.js";
import { n as SiteHeader, b as Button, m as SiteFooter } from "./site-chrome-Bvu9S7aA.js";
import { I as Input } from "./input-iG5zEoI9.js";
import { L as Label } from "./label-BkE_bE0M.js";
import { T as Textarea } from "./textarea-rlBQz2Te.js";
import { C as Card } from "./card-Ej90xD4L.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Contact() {
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    message: ""
  });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return toast.error("Please fill in all fields");
    toast.success("Thanks! We'll be in touch shortly.");
    setForm({
      name: "",
      email: "",
      message: ""
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Contact us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Have a question or partnership idea? Drop us a line." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.name, onChange: (e) => setForm({
            ...form,
            name: e.target.value
          }), maxLength: 100 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: form.email, onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }), maxLength: 255 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 5, value: form.message, onChange: (e) => setForm({
            ...form,
            message: e.target.value
          }), maxLength: 2e3 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: "Send message" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  Contact as component
};
