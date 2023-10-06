import mitt from "mitt";

type ApplicationEvents = {
  // translates to:
  // user:registered -> event name
  // User -> type as payload
  "user:deleted"?: null;
  "user:Banned"?: null;
  "user:RoleChanged"?: null;
  "user:created"?: null;
  "user:updated"?: null;
  "user:logedin"?: null;
  "user:loginFailed"?: null;
};

export default defineNuxtPlugin(() => {
  const emitter = mitt<ApplicationEvents>();

  return {
    provide: {
      event: emitter.emit, // Will emit an event
      listen: emitter.on, // Will register a listener for an event
      unlisten: emitter.off,
    },
  };
});
