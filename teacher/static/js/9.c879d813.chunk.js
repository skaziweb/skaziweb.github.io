(this["webpackJsonpnovakid-teacher"]=this["webpackJsonpnovakid-teacher"]||[]).push([[9],{227:function(e,t,n){"use strict";var c=n(7),o=n(1),i=n(30),r=n.n(i),l=n(95),s=n(236),a=n.n(s),u=r.a.bind(a.a),b=function(e){var t=e.title,n=e.loading,o=e.bold,i="undefined"!==typeof n;return Object(c.jsxs)("blockquote",{className:u("sectionTitle",{bold:o}),children:[Object(c.jsx)("p",{className:u("title"),children:t}),i&&Object(c.jsx)("div",{className:u("loader"),children:Object(c.jsx)(l.a,{loading:!!n,contains:!0})})]})};t.a=Object(o.memo)(b)},228:function(e,t,n){"use strict";var c=n(7),o=n(1),i=n(235),r=function(e){var t=e.loading,n=Object(o.useRef)(null);return Object(o.useEffect)((function(){t?n.current&&n.current.continuousStart():n.current&&n.current.complete()}),[t]),Object(c.jsx)(i.a,{color:"#f6bb3d",ref:n})};t.a=Object(o.memo)(r)},236:function(e,t,n){e.exports={sectionTitle:"SectionTitle_sectionTitle_1fqFx",bold:"SectionTitle_bold_MpdaX",title:"SectionTitle_title_1o40P",loader:"SectionTitle_loader_3AES-"}},366:function(e,t,n){e.exports={level:"Level_level_1YtRK",arrow:"Level_arrow_2i-NB",arrow__open:"Level_arrow__open_1zhXe",button:"Level_button_11vc7",buttonText:"Level_buttonText_34S9l"}},367:function(e,t,n){e.exports={unit:"Unit_unit_N_-XI",button:"Unit_button_2uaqw",buttonText:"Unit_buttonText_t1qKc"}},368:function(e,t,n){e.exports={lesson:"Lesson_lesson_Qp4ay"}},369:function(e,t,n){e.exports={units:"Tree_units_2hwsJ",lessons:"Tree_lessons_2Er2O"}},370:function(e,t,n){e.exports={program:"Program_program_3tt0R"}},507:function(e,t,n){"use strict";n.r(t);var c=n(4),o=n(7),i=n(1),r=n(30),l=n.n(r),s=n(234),a=n(44),u=n(43),b=function(e){return e.program.levelLoading||e.program.unitLoading||e.program.lessonLoading||e.program.topLoading},d=function(e){return{levels:e.program.levels,units:e.program.units,lessons:e.program.lessons}},j=n(228),m=n(107),O=n(227),v=n(56),f=n(106),p=n(366),x=n.n(p),_=l.a.bind(x.a),h=function(e){var t=e.title,n=e.children,c=e.defaultOpen,r=Object(i.useState)(c),l=Object(v.a)(r,2),s=l[0],a=l[1];return Object(o.jsxs)("div",{className:_("level"),children:[Object(o.jsxs)("button",{className:_("button"),type:"button",onClick:function(){a((function(e){return!e}))},children:[Object(o.jsx)(f.b,{color:"#4a4a4a",className:_("arrow",{arrow__open:s})}),Object(o.jsx)("span",{className:_("buttonText"),children:t})]}),s?n:null]})},g=Object(i.memo)(h),N=n(367),T=n.n(N),L=l.a.bind(T.a),w=function(e){var t=e.title,n=e.children,c=e.defaultOpen,r=Object(i.useState)(Boolean(c)),l=Object(v.a)(r,2),s=l[0],a=l[1];return Object(o.jsxs)("div",{className:L("unit"),children:[Object(o.jsx)("button",{className:L("button"),type:"button",onClick:function(){a((function(e){return!e}))},children:Object(o.jsx)("span",{className:L("buttonText"),children:t})}),s?n:null]})},S=Object(i.memo)(w),k=n(368),q=n.n(k),y=l.a.bind(q.a),E=function(e){var t=e.title;return Object(o.jsx)("div",{className:y("lesson"),children:t})},P=Object(i.memo)(E),J=n(369),R=n.n(J),U=l.a.bind(R.a),X=function(e){var t=e.levels,n=e.units,c=e.lessons;return Object(o.jsx)("div",{className:U("tree"),children:t.map((function(e,t){var i,r;return(null===(i=n[e.id])||void 0===i?void 0:i.length)?Object(o.jsx)(g,{title:"Level ".concat(e.number," - ").concat(e.name),defaultOpen:0===t,children:Object(o.jsx)("div",{className:U("units"),children:null===(r=n[e.id])||void 0===r?void 0:r.map((function(e){var t,n;return(null===(t=c[e.id])||void 0===t?void 0:t.length)?Object(o.jsx)(S,{title:e.name,children:Object(o.jsx)("div",{className:U("lessons"),children:null===(n=c[e.id])||void 0===n?void 0:n.map((function(e){return Object(o.jsx)(P,{title:e.name},e.id)}))})},e.id):null}))})},e.id):null}))})},B=Object(i.memo)(X),C=n(370),F=n.n(C),K=l.a.bind(F.a);t.default=function(){var e=Object(a.b)(),t=Object(a.c)(d),n=Object(a.c)(b);return Object(i.useEffect)((function(){e(Object(u.e)())}),[e]),Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(s.a,{children:Object(o.jsx)("title",{children:"Novakid - Program"})}),Object(o.jsx)(j.a,{loading:n}),Object(o.jsx)("div",{className:K("program"),children:Object(o.jsxs)(m.a,{children:[Object(o.jsx)(O.a,{title:"Program",bold:!0,loading:n}),Object(o.jsx)(B,Object(c.a)({},t))]})})]})}}}]);
//# sourceMappingURL=9.c879d813.chunk.js.map