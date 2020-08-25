const events = {};

export const SubscribeEvent = (name, callback) => {
  !(name in events) ? (events[name] = [callback]) : events[name].push(callback);
};

export const FireEvent = (name, args) => {
  !(name in events)
    ? console.log("no " + name + " to fire")
    : events[name].forEach((element) => {
        // console.log(args);
        element.apply(this, args);
      });
};

export const ClearEvent = (name) => {
  !(name in events) ? console.log("NOTHING TO CLEAR") : delete events[name];
};
