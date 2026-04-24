import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'file:///workspaces/agriculturalmachinery/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrGetDynamicModelProps, ssrIncludeBooleanAttr } from 'file:///workspaces/agriculturalmachinery/node_modules/vue/server-renderer/index.mjs';
import { Mail, Phone, MapPin, Loader2, Send } from 'file:///workspaces/agriculturalmachinery/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import { useForm } from 'file:///workspaces/agriculturalmachinery/node_modules/vee-validate/dist/vee-validate.mjs';
import * as z from 'file:///workspaces/agriculturalmachinery/node_modules/zod/index.js';
import { toTypedSchema } from 'file:///workspaces/agriculturalmachinery/node_modules/@vee-validate/zod/dist/vee-validate-zod.mjs';
import { u as useRuntimeConfig } from './server.mjs';
import { u as useState } from './state-_I5XcLqc.mjs';
import { u as useSeoMeta } from './index-DZ5-QLyc.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/h3/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/ufo/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unified/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/remark-parse/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/remark-rehype/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/remark-mdc/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/defu/dist/defu.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/remark-gfm/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/rehype-external-links/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/rehype-sort-attributes/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/rehype-raw/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/detab/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/scule/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/micromark-util-sanitize-uri/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/hast-util-to-string/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/github-slugger/index.js';
import 'google-spreadsheet';
import 'google-auth-library';
import 'file:///workspaces/agriculturalmachinery/node_modules/destr/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/hookable/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/node-mock-http/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unstorage/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unstorage/drivers/fs.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/klona/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unctx/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///workspaces/agriculturalmachinery/node_modules/pathe/dist/index.mjs';
import 'ipx';
import 'file:///workspaces/agriculturalmachinery/node_modules/@nuxt/image/node_modules/pathe/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unhead/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/vue-router/vue-router.node.mjs';

const contactSchema = toTypedSchema(
  z.object({
    // 1. Name 校验
    name: z.string().min(1, "Please enter your name").min(2, "Name must be at least 2 characters"),
    // 拦截长度不足
    // 2. Email 校验
    // 解决提示：现代 Zod 建议先检查 min(1) 确保必填，再检查 email 格式
    email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
    // 格式错误提示
    // 3. Subject 校验
    subject: z.string().min(1, "Subject is required").min(3, "Subject must be at least 3 characters"),
    // 4. Message 校验
    message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters")
  })
);
const useToast = () => {
  const toasts = useState("toasts", () => []);
  const showToast = (message, type = "success") => {
    const id = Date.now();
    toasts.value.push({ id, message, type });
    setTimeout(() => {
      removeToast(id);
    }, 3e3);
  };
  const removeToast = (id) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };
  return {
    toasts,
    success: (msg) => showToast(msg, "success"),
    error: (msg) => showToast(msg, "error"),
    info: (msg) => showToast(msg, "info")
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const accessKey = config.public.web3FormsKey;
    const toast = useToast();
    const siteConfig = ref({ contact: {} });
    const { defineField, handleSubmit, errors, isSubmitting, resetForm } = useForm({
      validationSchema: contactSchema,
      initialValues: {
        name: "",
        email: "",
        subject: "",
        message: ""
      }
    });
    const [name, nameAttrs] = defineField("name", { validateOnModelUpdate: false });
    const [email, emailAttrs] = defineField("email", { validateOnModelUpdate: false });
    const [subject, subjectAttrs] = defineField("subject", { validateOnModelUpdate: false });
    const [message, messageAttrs] = defineField("message", { validateOnModelUpdate: false });
    handleSubmit(async (values) => {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ access_key: accessKey, ...values })
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Inquiry sent successfully!");
          resetForm();
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        toast.error(error.message || "Failed to send");
      }
    });
    useSeoMeta({
      title: () => {
        var _a, _b;
        return ((_b = (_a = siteConfig.value) == null ? void 0 : _a.seo) == null ? void 0 : _b.contact.title) || "Default Title";
      },
      description: () => {
        var _a, _b;
        return ((_b = (_a = siteConfig.value) == null ? void 0 : _a.seo) == null ? void 0 : _b.contact.description) || "Default description";
      },
      ogTitle: () => {
        var _a, _b;
        return ((_b = (_a = siteConfig.value) == null ? void 0 : _a.seo) == null ? void 0 : _b.contact.title) || "Default Title";
      },
      ogDescription: () => {
        var _a, _b;
        return ((_b = (_a = siteConfig.value) == null ? void 0 : _a.seo) == null ? void 0 : _b.contact.description) || "Default description";
      },
      ogImage: () => {
        var _a, _b;
        return ((_b = (_a = siteConfig.value) == null ? void 0 : _a.seo) == null ? void 0 : _b.contact.ogImage) || "/default-og.jpg";
      },
      twitterCard: () => {
        var _a, _b;
        return ((_b = (_a = siteConfig.value) == null ? void 0 : _a.seo) == null ? void 0 : _b.contact.twitterCard) || "summary_large_image";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      let _temp0, _temp1, _temp2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "contact-page pt-24 pb-16 bg-slate-50" }, _attrs))}><div class="container mx-auto px-4"><div class="text-center max-w-2xl mx-auto mb-16"><h1 class="text-4xl font-extrabold text-slate-900 mb-6">Let\u2019s Start A Conversation</h1><p class="text-lg text-slate-600">Have questions about our products or need a custom quote? Our professional team is ready to assist you 24/7.</p></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-12"><div class="lg:col-span-5 space-y-8"><div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"><h3 class="text-xl font-bold text-slate-900 mb-6">Contact Information</h3><div class="space-y-6"><div class="flex gap-4"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Mail), { class: "w-6 h-6" }, null, _parent));
      _push(`</div><div><p class="text-sm text-slate-400 font-semibold uppercase">Email Us</p><a${ssrRenderAttr("href", `mailto:${(_a = siteConfig.value.contact) == null ? void 0 : _a.email}`)} class="text-slate-900 font-medium hover:text-blue-600">${ssrInterpolate(((_b = siteConfig.value.contact) == null ? void 0 : _b.email) || "sales@company.com")}</a></div></div><div class="flex gap-4"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Phone), { class: "w-6 h-6" }, null, _parent));
      _push(`</div><div><p class="text-sm text-slate-400 font-semibold uppercase">Call Us</p><a${ssrRenderAttr("href", `tel:${(_c = siteConfig.value.contact) == null ? void 0 : _c.phone}`)} class="text-slate-900 font-medium hover:text-blue-600">${ssrInterpolate(((_d = siteConfig.value.contact) == null ? void 0 : _d.phone) || "+86 136 5661 7631")}</a></div></div><div class="flex gap-4"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(MapPin), { class: "w-6 h-6" }, null, _parent));
      _push(`</div><div><p class="text-sm text-slate-400 font-semibold uppercase">Office Address</p><p class="text-slate-900 font-medium">${ssrInterpolate(((_e = siteConfig.value.contact) == null ? void 0 : _e.address) || "Building A,Industrial Park")}</p></div></div></div></div></div><div class="lg:col-span-7"><div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100"><form class="space-y-6" novalidate><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-slate-700 mb-2">Name</label><input${ssrRenderAttrs((_temp0 = mergeProps({ value: unref(name) }, unref(nameAttrs), {
        type: "text",
        class: [unref(errors).name ? "border-red-500" : "border-slate-200", "w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all"],
        placeholder: "John Doe"
      }), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(name)))))}>`);
      if (unref(errors).name) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(unref(errors).name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm font-medium text-slate-700 mb-2">Email</label><input${ssrRenderAttrs((_temp1 = mergeProps({ value: unref(email) }, unref(emailAttrs), {
        type: "email",
        class: [unref(errors).email ? "border-red-500" : "border-slate-200", "w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all"],
        placeholder: "john@example.com"
      }), mergeProps(_temp1, ssrGetDynamicModelProps(_temp1, unref(email)))))}>`);
      if (unref(errors).email) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(unref(errors).email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label class="block text-sm font-medium text-slate-700 mb-2">Subject</label><input${ssrRenderAttrs((_temp2 = mergeProps({ value: unref(subject) }, unref(subjectAttrs), {
        type: "text",
        class: [unref(errors).subject ? "border-red-500" : "border-slate-200", "w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all"],
        placeholder: "Regarding product..."
      }), mergeProps(_temp2, ssrGetDynamicModelProps(_temp2, unref(subject)))))}>`);
      if (unref(errors).subject) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(unref(errors).subject)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm font-medium text-slate-700 mb-2">Message</label><textarea${ssrRenderAttrs(mergeProps(unref(messageAttrs), {
        rows: "5",
        class: [unref(errors).message ? "border-red-500" : "border-slate-200", "w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all"],
        placeholder: "Tell us about your project..."
      }), "textarea")}>${ssrInterpolate(unref(message))}</textarea>`);
      if (unref(errors).message) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(unref(errors).message)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} class="w-full bg-[#001151] cursor-pointer hover:bg-bg-[#001151]/50 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">`);
      if (unref(isSubmitting)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 animate-spin" }, null, _parent));
        _push(`<span>Sending...</span><!--]-->`);
      } else {
        _push(`<!--[--><span>Send Inquiry Now</span>`);
        _push(ssrRenderComponent(unref(Send), { class: "w-4 h-4 transition-transform" }, null, _parent));
        _push(`<!--]-->`);
      }
      _push(`</button></form></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-DcgVONLu.mjs.map
