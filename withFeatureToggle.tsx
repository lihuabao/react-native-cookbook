import React from "react";
import toggleValues from "./toggleconfig.json";

export default function withFeatureToggle(WrappedComponent, ComponentName) {
  const isFeatureOn = toggleValues.components.filter(
    x => x.name === ComponentName
  )[0].shouldAppear;

  return function() {
    if (isFeatureOn) {
      return <WrappedComponent />;
    } else {
      return null;
    }
  };
}
