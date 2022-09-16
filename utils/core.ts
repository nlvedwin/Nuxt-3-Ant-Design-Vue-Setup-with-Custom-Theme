import {
    Invitation,
    Inviter,
    InviterOptions,
    Referral,
    Registerer,
    RegistererOptions,
    Session,
    SessionState,
    UserAgent,
    UserAgentOptions,
    InvitationAcceptOptions
  } from "sip.js";

  /*
   * Create a user agent
   */
  const uri = UserAgent.makeURI("sip:alice@example.com");
  if (!uri) {
    throw new Error("Failed to create URI");
  }
  const userAgentOptions: UserAgentOptions = {
    uri,
    /* ... */
  };
  const userAgent = new UserAgent(userAgentOptions);

  /*
   * Setup handling for incoming INVITE requests
   */
  userAgent.delegate = {
    onInvite(invitation: Invitation): void {

      // An Invitation is a Session
      const incomingSession: Session = invitation;

      // Setup incoming session delegate
      incomingSession.delegate = {
        // Handle incoming REFER request.
        onRefer(referral: Referral): void {
          // ...
        }
      };

      // Handle incoming session state changes.
      incomingSession.stateChange.addListener((newState: SessionState) => {
        switch (newState) {
          case SessionState.Establishing:
            // Session is establishing.
            break;
          case SessionState.Established:
            // Session has been established.
            break;
          case SessionState.Terminated:
            // Session has terminated.
            break;
          default:
            break;
        }
      });

      // Handle incoming INVITE request.
      let constrainsDefault: MediaStreamConstraints = {
        audio: true,
        video: false,
      }

      const options: InvitationAcceptOptions = {
        sessionDescriptionHandlerOptions: {
          constraints: constrainsDefault,
        },
      }

      incomingSession.accept(options)
    }
  };

  /*
   * Create a Registerer to register user agent
   */
  const registererOptions: RegistererOptions = { /* ... */ };
  const registerer = new Registerer(userAgent, registererOptions);

  /*
   * Start the user agent
   */
  userAgent.start().then(() => {

    // Register the user agent
    registerer.register();

    // Send an outgoing INVITE request
    const target = UserAgent.makeURI("sip:bob@example.com");
    if (!target) {
      throw new Error("Failed to create target URI.");
    }

    // Create a new Inviter
    const inviterOptions: InviterOptions = { /* ... */ };
    const inviter = new Inviter(userAgent, target, inviterOptions);

    // An Inviter is a Session
    const outgoingSession: Session = inviter;

    // Setup outgoing session delegate
    outgoingSession.delegate = {
      // Handle incoming REFER request.
      onRefer(referral: Referral): void {
        // ...
      }
    };

    // Handle outgoing session state changes.
    outgoingSession.stateChange.addListener((newState: SessionState) => {
      switch (newState) {
        case SessionState.Establishing:
          // Session is establishing.
          break;
        case SessionState.Established:
          // Session has been established.
          break;
        case SessionState.Terminated:
          // Session has terminated.
          break;
        default:
          break;
      }
    });

    // Send the INVITE request
    inviter.invite()
      .then(() => {
        // INVITE sent
      })
      .catch((error: Error) => {
        // INVITE did not send
      });

    // Send an outgoing REFER request
    const transferTarget = UserAgent.makeURI("sip:transfer@example.com");

    if (!transferTarget) {
      throw new Error("Failed to create transfer target URI.");
    }

    outgoingSession.refer(transferTarget, {
      // Example of extra headers in REFER request
      requestOptions: {
        extraHeaders: [
          'X-Referred-By-Someone: Username'
        ]
      },
      requestDelegate: {
        onAccept(): void {
          // ...
        }
      }
    });
  });