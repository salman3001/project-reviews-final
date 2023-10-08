import mitt from "mitt";

type ApplicationEvents = {
  // translates to:
  // user:registered -> event name
  // User -> type as payload
  "user:Banned"?: null;
  "user:RoleChanged"?: null;
  "user:logedin"?: null;
  "user:loginFailed"?: null;
  "Fetch:error": { message: string };
  "record:created"?: { message: string };
  "record:updated"?: { message: string };
  "record:deleted"?: { message: string };
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
