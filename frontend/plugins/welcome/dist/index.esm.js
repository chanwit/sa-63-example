import { HeaderLabel, Page, pageTheme, Header, Content, ContentHeader, SupportButton, InfoCard, createPlugin } from '@backstage/core';
import React from 'react';
import { Link as Link$1 } from 'react-router-dom';
import { Grid, Typography, List, ListItem, ListItemText, Link } from '@material-ui/core';

const timeFormat = {hour: "2-digit", minute: "2-digit"};
const utcOptions = {timeZone: "UTC", ...timeFormat};
const nycOptions = {timeZone: "America/New_York", ...timeFormat};
const tyoOptions = {timeZone: "Asia/Tokyo", ...timeFormat};
const stoOptions = {timeZone: "Europe/Stockholm", ...timeFormat};
const defaultTimes = {
  timeNY: "",
  timeUTC: "",
  timeTYO: "",
  timeSTO: ""
};
function getTimes() {
  const d = new Date();
  const lang = window.navigator.language;
  const timeNY = d.toLocaleTimeString(lang, nycOptions);
  const timeUTC = d.toLocaleTimeString(lang, utcOptions);
  const timeTYO = d.toLocaleTimeString(lang, tyoOptions);
  const timeSTO = d.toLocaleTimeString(lang, stoOptions);
  return {timeNY, timeUTC, timeTYO, timeSTO};
}
const HomePageTimer = () => {
  const [{timeNY, timeUTC, timeTYO, timeSTO}, setTimes] = React.useState(defaultTimes);
  React.useEffect(() => {
    setTimes(getTimes());
    const intervalId = setInterval(() => {
      setTimes(getTimes());
    }, 1e3);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HeaderLabel, {
    label: "NYC",
    value: timeNY
  }), /* @__PURE__ */ React.createElement(HeaderLabel, {
    label: "UTC",
    value: timeUTC
  }), /* @__PURE__ */ React.createElement(HeaderLabel, {
    label: "STO",
    value: timeSTO
  }), /* @__PURE__ */ React.createElement(HeaderLabel, {
    label: "TYO",
    value: timeTYO
  }));
};

const WelcomePage = () => {
  return /* @__PURE__ */ React.createElement(Page, {
    theme: pageTheme.home
  }, /* @__PURE__ */ React.createElement(Header, {
    title: `Welcome ${ "to Backstage"}`,
    subtitle: "Some quick intro and links."
  }, /* @__PURE__ */ React.createElement(HomePageTimer, null)), /* @__PURE__ */ React.createElement(Content, null, /* @__PURE__ */ React.createElement(ContentHeader, {
    title: "Getting Started"
  }, /* @__PURE__ */ React.createElement(SupportButton, null)), /* @__PURE__ */ React.createElement(Grid, {
    container: true
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /* @__PURE__ */ React.createElement(InfoCard, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "body1",
    gutterBottom: true
  }, "You now have a running instance of Backstage!", /* @__PURE__ */ React.createElement("span", {
    role: "img",
    "aria-label": "confetti"
  }, "🎉"), "Let's make sure you get the most out of this platform by walking you through the basics."), /* @__PURE__ */ React.createElement(Typography, {
    variant: "h6",
    gutterBottom: true
  }, "The Setup"), /* @__PURE__ */ React.createElement(Typography, {
    variant: "body1",
    paragraph: true
  }, "Backstage is put together from three base concepts: the core, the app and the plugins."), /* @__PURE__ */ React.createElement(List, null, /* @__PURE__ */ React.createElement(ListItem, null, /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "The core is responsible for base functionality."
  })), /* @__PURE__ */ React.createElement(ListItem, null, /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "The app provides the base UI and connects the plugins."
  })), /* @__PURE__ */ React.createElement(ListItem, null, /* @__PURE__ */ React.createElement(ListItemText, {
    primary: "The plugins make Backstage useful for the end users with\n                  specific views and functionality."
  }))), /* @__PURE__ */ React.createElement(Typography, {
    variant: "h6",
    gutterBottom: true
  }, "Try It Out"), /* @__PURE__ */ React.createElement(Typography, {
    variant: "body1",
    paragraph: true
  }, "We suggest you either check out the documentation for", " ", /* @__PURE__ */ React.createElement(Link, {
    href: "https://github.com/spotify/backstage/blob/master/docs/getting-started/create-a-plugin.md"
  }, "creating a plugin"), " ", "or have a look in the code for the", " ", /* @__PURE__ */ React.createElement(Link, {
    component: Link$1,
    to: "/home"
  }, "Home Page"), " ", 'in the directory "plugins/home-page/src".'))), /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(InfoCard, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h5"
  }, "Quick Links"), /* @__PURE__ */ React.createElement(List, null, /* @__PURE__ */ React.createElement(ListItem, null, /* @__PURE__ */ React.createElement(Link, {
    href: "https://backstage.io"
  }, "backstage.io")), /* @__PURE__ */ React.createElement(ListItem, null, /* @__PURE__ */ React.createElement(Link, {
    href: "https://github.com/spotify/backstage/blob/master/docs/getting-started/create-a-plugin.md"
  }, "Create a plugin"))))))));
};

const plugin = createPlugin({
  id: "welcome",
  register({router}) {
    router.registerRoute("/", WelcomePage);
  }
});

export { plugin };
