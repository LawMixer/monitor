"use strict";(self.webpackChunkdocsite=self.webpackChunkdocsite||[]).push([[648],{593:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>a});var o=n(4848),t=n(8453);const r={},s="Configuration",c={id:"build-images/configuration",title:"Configuration",description:"Monitor just needs a bit of information in order to build your image.",source:"@site/docs/build-images/configuration.md",sourceDirName:"build-images",slug:"/build-images/configuration",permalink:"/docs/build-images/configuration",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/build-images/configuration.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Building Images",permalink:"/docs/build-images"},next:{title:"Pre-build command",permalink:"/docs/build-images/pre-build"}},d={},a=[{value:"Provider configuration",id:"provider-configuration",level:3},{value:"Repo configuration",id:"repo-configuration",level:3},{value:"Docker build configuration",id:"docker-build-configuration",level:3},{value:"Image registry",id:"image-registry",level:3},{value:"Adding build args",id:"adding-build-args",level:3},{value:"Adding build secrets",id:"adding-build-secrets",level:3}];function l(e){const i={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h3:"h3",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.h1,{id:"configuration",children:"Configuration"}),"\n",(0,o.jsx)(i.p,{children:"Monitor just needs a bit of information in order to build your image."}),"\n",(0,o.jsx)(i.h3,{id:"provider-configuration",children:"Provider configuration"}),"\n",(0,o.jsxs)(i.p,{children:["Monitor supports cloning repos over http/s, from any provider that supports cloning private repos using ",(0,o.jsx)(i.code,{children:"git clone https://<Token>@git-provider.net/<Owner>/<Repo>"}),"."]}),"\n",(0,o.jsxs)(i.p,{children:["Accounts / access tokens can be configured in either the ",(0,o.jsx)(i.a,{href:"/docs/core-setup#configuration",children:"core config"}),"\nor in the ",(0,o.jsx)(i.a,{href:"/docs/connecting-servers#manual-install-steps",children:"periphery config"}),"."]}),"\n",(0,o.jsx)(i.h3,{id:"repo-configuration",children:"Repo configuration"}),"\n",(0,o.jsxs)(i.p,{children:["To specify the git repo to build, just give it the name of the repo and the branch under ",(0,o.jsx)(i.em,{children:"repo config"}),". The name is given like ",(0,o.jsx)(i.code,{children:"mbecker20/monitor"}),", it includes the username / organization that owns the repo."]}),"\n",(0,o.jsx)(i.p,{children:"Many repos are private, in this case an access token is needed by the building server.\nIt can either come from a provider defined in the core configuration,\nor in the periphery configuration of the building server."}),"\n",(0,o.jsx)(i.h3,{id:"docker-build-configuration",children:"Docker build configuration"}),"\n",(0,o.jsxs)(i.p,{children:["In order to docker build, monitor just needs to know the build directory and the path of the Dockerfile relative to the repo, you can configure these in the ",(0,o.jsx)(i.em,{children:"build config"})," section."]}),"\n",(0,o.jsxs)(i.p,{children:["If the build directory is the root of the repository, you pass the build path as ",(0,o.jsx)(i.code,{children:"."}),'. If the build directory is some folder of the repo, just pass the name of the the folder. Do not pass the preceding "/". for example ',(0,o.jsx)(i.code,{children:"build/directory"})]}),"\n",(0,o.jsxs)(i.p,{children:["The dockerfile's path is given relative to the build directory. So if your build directory is ",(0,o.jsx)(i.code,{children:"build/directory"})," and the dockerfile is in ",(0,o.jsx)(i.code,{children:"build/directory/Dockerfile.example"}),", you give the dockerfile path simply as ",(0,o.jsx)(i.code,{children:"Dockerfile.example"}),"."]}),"\n",(0,o.jsx)(i.h3,{id:"image-registry",children:"Image registry"}),"\n",(0,o.jsx)(i.p,{children:"Monitor supports pushing to any docker registry.\nAny of the accounts that are specified in config for the specific registry, between the core config and builder, will be available to use for authentication against the registry.\nAdditionally, allowed organizations on the docker registry can be specified on the core config and attached to builds.\nDoing so will cause the images to be published under the organization's namespace rather than the account's."}),"\n",(0,o.jsx)(i.p,{children:"When connecting a build to a deployments, the default behavior is for the deployment to inherit the registry configuration from the build.\nIn cases where that account isn't available to the deployment, another account can be chosen in the deployment config."}),"\n",(0,o.jsx)(i.admonition,{type:"note",children:(0,o.jsxs)(i.p,{children:["In order to publish to the Github Container Registry, your Github access token must be given the ",(0,o.jsx)(i.code,{children:"write:packages"})," permission.\nSee the Github docs ",(0,o.jsx)(i.a,{href:"https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic",children:"here"}),"."]})}),"\n",(0,o.jsx)(i.h3,{id:"adding-build-args",children:"Adding build args"}),"\n",(0,o.jsxs)(i.p,{children:["The Dockerfile may make use of ",(0,o.jsx)(i.a,{href:"https://docs.docker.com/engine/reference/builder/#arg",children:"build args"}),". Build args can be passed using the gui by navigating to the ",(0,o.jsx)(i.code,{children:"Build Args"})," tab in the config. They are passed in the menu just like in the would in a .env file:"]}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{children:"BUILD_ARG1=some_value\nBUILD_ARG2=some_other_value\n"})}),"\n",(0,o.jsxs)(i.p,{children:["Note that these values are visible in the final image using ",(0,o.jsx)(i.code,{children:"docker history"}),", so shouldn't be used to pass build time secrets. Use ",(0,o.jsx)(i.a,{href:"https://docs.docker.com/engine/reference/builder/#run---mounttypesecret",children:"secret mounts"})," for this instead."]}),"\n",(0,o.jsx)(i.h3,{id:"adding-build-secrets",children:"Adding build secrets"}),"\n",(0,o.jsxs)(i.p,{children:["The Dockerfile may also make use of ",(0,o.jsx)(i.a,{href:"https://docs.docker.com/build/building/secrets",children:"build secrets"}),"."]}),"\n",(0,o.jsx)(i.p,{children:"They are configured in the GUI the same way as build args. The values passed here can be used in RUN commands in the Dockerfile:"}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{children:"RUN --mount=type=secret,id=SECRET_KEY \\\n  SECRET_KEY=$(cat /run/secrets/SECRET_KEY) ...\n"})}),"\n",(0,o.jsxs)(i.p,{children:["These values will not be visible with ",(0,o.jsx)(i.code,{children:"docker history"})," command."]})]})}function h(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,o.jsx)(i,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>s,x:()=>c});var o=n(6540);const t={},r=o.createContext(t);function s(e){const i=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),o.createElement(r.Provider,{value:i},e.children)}}}]);