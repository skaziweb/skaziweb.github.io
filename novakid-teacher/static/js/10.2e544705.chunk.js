(this["webpackJsonpnovakid-teacher"]=this["webpackJsonpnovakid-teacher"]||[]).push([[10],{226:function(e,t,n){"use strict";var i=n(7),c=n(1),r=n(30),a=n.n(r),o=n(106),s=n(235),l=n.n(s),b=a.a.bind(l.a),d=function(e){var t=e.title,n=e.loading,c=e.bold,r="undefined"!==typeof n;return Object(i.jsxs)("blockquote",{className:b("sectionTitle",{bold:c}),children:[Object(i.jsx)("p",{className:b("title"),children:t}),r&&Object(i.jsx)("div",{className:b("loader"),children:Object(i.jsx)(o.a,{loading:!!n,contains:!0})})]})};t.a=Object(c.memo)(d)},227:function(e,t,n){"use strict";var i=n(7),c=n(1),r=n(234),a=function(e){var t=e.loading,n=Object(c.useRef)(null);return Object(c.useEffect)((function(){t?n.current&&n.current.continuousStart():n.current&&n.current.complete()}),[t]),Object(i.jsx)(r.a,{color:"#f6bb3d",ref:n})};t.a=Object(c.memo)(a)},235:function(e,t,n){e.exports={sectionTitle:"SectionTitle_sectionTitle_1fqFx",bold:"SectionTitle_bold_MpdaX",title:"SectionTitle_title_1o40P",loader:"SectionTitle_loader_3AES-"}},364:function(e,t,n){e.exports={links:"Library_links_198k0"}},508:function(e,t,n){"use strict";n.r(t);var i=n(7),c=n(1),r=n(30),a=n.n(r),o=n(233),s=n(45),l=n(227),b=n(105),d=n(226),j=function(e){return e.library.sectionLoading||e.library.linkLoading||e.library.topLoading},u=function(e){return e.library.sectionLoading},f=function(e){return e.library.linkLoading},O=function(e){return e.library},h=n(73),p=n(364),x=n.n(p),m=a.a.bind(x.a);t.default=function(){var e=Object(s.b)(),t=Object(s.c)(O),n=t.sections,r=t.links,a=Object(s.c)(j),p=Object(s.c)(u),x=Object(s.c)(f);Object(c.useEffect)((function(){e(Object(h.b)())}),[e]);var _={};return r.forEach((function(e){_[e.section_id]||(_[e.section_id]=[]),_[e.section_id].push(e)})),Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(o.a,{children:Object(i.jsx)("title",{children:"Novakid - Library"})}),Object(i.jsx)(l.a,{loading:a}),Object(i.jsx)("div",{className:m("library"),children:Object(i.jsxs)(b.a,{children:[n.map((function(e){return Object(i.jsxs)("div",{className:m("section"),children:[Object(i.jsx)(d.a,{title:e.name_en,bold:!0,loading:p||x}),Object(i.jsx)("div",{className:m("links"),children:_[e.id]&&_[e.id].map((function(e){return Object(i.jsxs)("a",{href:e.link,target:"_blank",rel:"noopener noreferrer",children:[Object(i.jsx)("img",{src:"".concat("https://api-qa.novakidschool.com/api/0/","/files/").concat(e.image_file_id,"/content")}),Object(i.jsx)("span",{children:e.name_en})]})}))})]})})),!a&&!n.length&&Object(i.jsx)("div",{children:"Library is empty"})]})})]})}}}]);
//# sourceMappingURL=10.2e544705.chunk.js.map