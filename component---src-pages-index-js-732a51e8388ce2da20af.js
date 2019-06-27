(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{154:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(176),o=a(156),l=a(247),c=a(201),s=a(205),m=a(211),u=a(390),p=a(166),d=a(177),g=a(2152),h=a.n(g),E=Object(o.f)({sectionTitle:{id:"parts.SupportCta.sectionTitle",defaultMessage:"Questions? Problems? Existential dilemmas? We can help!"}}),f=function(){return n.a.createElement("div",{className:h.a.main},n.a.createElement("div",{className:h.a.contentWrapper},n.a.createElement(m.a,{appearance:{size:"large",theme:"primary",weight:"medium"},text:E.sectionTitle}),n.a.createElement("div",{className:h.a.iconRow},n.a.createElement(p.a,{className:h.a.iconItemLink,href:d.b},n.a.createElement(u.a,{name:"social_discourse_devPortal",title:"Discourse"})),n.a.createElement(p.a,{className:h.a.iconItemLink,href:d.e},n.a.createElement(u.a,{name:"social_github_devPortal",title:"GitHub"})),n.a.createElement(p.a,{className:h.a.iconItemLink,href:d.h},n.a.createElement(u.a,{name:"social_gitter_devPortal",title:"Gitter"})))))};f.displayName="parts.SupportCta";var v=f,b=a(639),T=a(222),y=a(183),F=a(2153),x=a.n(F),N=function(e){var t=e.contentText,a=e.headingText,r=e.linkText,i=e.linkUrl;return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement(m.a,{appearance:{margin:"none",size:"medium",theme:"invert",weight:"medium"},text:a})),n.a.createElement("div",{className:x.a.heroFeatureTextContainer},n.a.createElement("p",{className:x.a.heroFeatureText},n.a.createElement(o.b,t)))),n.a.createElement("div",null,n.a.createElement(p.a,{arrow:"right",className:x.a.heroFeatureLink,href:i,text:r})))};N.displayName="pages.Developers.HeroFeatureItem";var k=N,D=a(2154),j=a.n(D),O=Object(o.f)({heroTitle:{id:"pages.Developers.heroTitle",defaultMessage:"Build with Colony"},heroFeatureGetStartedTitle:{id:"pages.Developers.heroFeatureGetStartedTitle",defaultMessage:"Get Started"},heroFeatureGetStartedText:{id:"pages.Developers.heroFeatureGetStartedText",defaultMessage:"Build incentives and reputation into your app, firm, or community."},heroFeatureGetStartedLinkText:{id:"pages.Developers.heroFeatureGetStartedLinkText",defaultMessage:"Build"},heroFeatureContributeTitle:{id:"pages.Developers.heroFeatureContributeTitle",defaultMessage:"Contribute"},heroFeatureContributeText:{id:"pages.Developers.heroFeatureContributeText",defaultMessage:"We believe in being open. All of our projects are open-source and accepting contributions."},heroFeatureForumTitle:{id:"pages.Developers.heroFeatureForumTitle",defaultMessage:"Discuss"},heroFeatureForumText:{id:"pages.Developers.heroFeatureForumText",defaultMessage:"Join in the discussion and collaborate with our community of builders."}}),w=function(){return n.a.createElement("div",{className:j.a.main},n.a.createElement("div",{className:j.a.heroBackgroundImage},n.a.createElement(y.a,{alt:O.heroTitle,src:Object(T.b)("img/devPortal_banner_bg.svg")})),n.a.createElement("div",{className:j.a.contentContainer},n.a.createElement("div",{className:j.a.heroTitle},n.a.createElement(m.a,{appearance:{size:"huge",theme:"invert",weight:"medium"},text:O.heroTitle})),n.a.createElement("div",{className:j.a.heroFeature},n.a.createElement("div",{className:j.a.heroFeatureItem},n.a.createElement(k,{contentText:O.heroFeatureGetStartedText,headingText:O.heroFeatureGetStartedTitle,linkText:O.heroFeatureGetStartedLinkText,linkUrl:d.v})),n.a.createElement("div",{className:j.a.heroFeatureItem},n.a.createElement(k,{contentText:O.heroFeatureContributeText,headingText:O.heroFeatureContributeTitle,linkText:"GitHub",linkUrl:d.e})),n.a.createElement("div",{className:j.a.heroFeatureItem},n.a.createElement(k,{contentText:O.heroFeatureForumText,headingText:O.heroFeatureForumTitle,linkText:"Discourse",linkUrl:d.b})))))};w.displayName="pages.Developers.Hero";var S=w,C=a(640),P=a(2155),M=a.n(P),G=Object(o.f)({pageDescription:{id:"pages.Developers.pageDescription",defaultMessage:"Just like the organizations that will run on Colony,\neach component in the colony stack is the product of collaboration and open\nengagement. Here, you'll find the up-to-date documentation for all of the\nColony projects."},pageTitle:{id:"pages.Developers.pageTitle",defaultMessage:"Developer Portal"}}),I=function(e){var t=(0,e.intl.formatMessage)(G.pageTitle);return n.a.createElement(n.a.Fragment,null,n.a.createElement(s.a,{description:G.pageDescription,title:t}),n.a.createElement(c.Helmet,null,n.a.createElement("title",null,t)),n.a.createElement("main",{className:M.a.main},n.a.createElement(S,null),n.a.createElement(b.b,null),n.a.createElement(C.a,null),n.a.createElement(v,{withBackground:!0})))};I.displayName="pages.Developers";var L=I,_=Object(i.a)(o.g),W=Object(i.d)(l.a,_(L));t.default=function(){return Object(r.createElement)(W)}},205:function(e,t,a){"use strict";a(224);var r=a(156),n=a(176),i=a(234),o=a(235),l=a(0),c=a.n(l),s=a(201),m=a.n(s),u=a(222),p=Object(r.f)({siteName:{id:"parts.SEO.siteName",defaultMessage:"Colony Open Source Docs"}}),d=function(e){var t=e.baseUrl,a=e.description,r=e.descriptionValues,n=e.getAbsoluteImagePath,i=e.intl.formatMessage,o=e.isDocPage,l=e.location,s=e.siteLogo,d=e.title,g=e.titleValues,h=e.images,E=void 0===h?[s]:h,f=l&&""+t+Object(u.b)(l.pathname),v=E.map(n);v.indexOf(s)<0&&v.push(s);var b=l&&"/"===l.pathname?"website":"article",T=i(p.siteName),y="string"==typeof d?d:i(d,g),F="string"==typeof a?a:i(a,r),x=[{"@context":"http://schema.org","@type":"WebSite",url:t,name:T}];return o&&x.push({"@context":"http://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,item:{"@id":f,name:y,image:v[0]}}]},{"@context":"http://schema.org","@type":"BlogPosting",author:"Colony",url:f,name:y,headline:y,image:{"@type":"ImageObject",url:v[0]},description:F}),c.a.createElement(m.a,null,c.a.createElement("meta",{name:"description",content:F}),v.map(function(e){return c.a.createElement("meta",{name:"image",content:e,key:e})}),c.a.createElement("script",{type:"application/ld+json"},JSON.stringify(x)),c.a.createElement("meta",{itemProp:"name",content:y}),c.a.createElement("meta",{itemProp:"description",content:F}),v.map(function(e){return c.a.createElement("meta",{itemProp:"image",content:e,key:e})}),c.a.createElement("meta",{property:"og:url",content:f}),c.a.createElement("meta",{property:"og:type",content:b}),c.a.createElement("meta",{property:"og:title",content:y}),c.a.createElement("meta",{property:"og:description",content:F}),c.a.createElement("meta",{property:"og:site_name",content:T}),v.map(function(e){return c.a.createElement("meta",{property:"og:image",content:e,key:e})}),c.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),c.a.createElement("meta",{name:"twitter:site",content:"@joincolony"}),c.a.createElement("meta",{name:"twitter:title",content:y}),c.a.createElement("meta",{name:"twitter:description",content:F}),v.map(function(e){return c.a.createElement("meta",{name:"twitter:image",content:e,key:e})}))};d.displayName="parts.SEO";var g=d,h=Object(n.a)(r.g,function(e){return Object(n.c)(i.a.Consumer,function(e){return{files:e}})(e)},Object(o.a)(),Object(n.b)({isDocPage:!1}),Object(n.f)(function(){return{baseUrl:"https://docs.colony.io"}}),Object(n.e)({getAbsoluteImagePath:function(e){var t=e.baseUrl,a=e.files,r=e.project;return function(e){return e.startsWith("http")?e:""+t+(a&&a[r+"/"+e]?a[r+"/"+e]:e)}}}),Object(n.f)(function(e){return{siteLogo:(0,e.getAbsoluteImagePath)("/img/colonyDocs_combomark.svg")}}))(g);a.d(t,"a",function(){return h})},224:function(e,t,a){"use strict";var r=a(11),n=a(15),i=a(81),o="".startsWith;r(r.P+r.F*a(82)("startsWith"),"String",{startsWith:function(e){var t=i(this,e,"startsWith"),a=n(Math.min(arguments.length>1?arguments[1]:void 0,t.length)),r=String(e);return o?o.call(t,r,a):t.slice(a,a+r.length)===r}})}}]);
//# sourceMappingURL=component---src-pages-index-js-732a51e8388ce2da20af.js.map