interface AuthClient {
  login(): void;
}

interface UserClient {
  me(): void;
}

interface ApiFactory {
  createAuthClient(): AuthClient;
  createUserClient(): UserClient;
}

class DevAuthClient implements AuthClient {
  login() {
    console.log("Dev Auth Client: Logging in with dev credentials");
  }
}
class DevUserClient implements UserClient {
  me() {
    console.log("Dev User Client: Fetching dev user data");
  }
}
class ProdAuthClient implements AuthClient {
  login() {
    console.log("Prod Auth Client: Logging in with production credentials");
  }
}
class ProdUserClient implements UserClient {
  me() {
    console.log("Prod User Client: Fetching production user data");
  }
}

class MockAuthClient implements AuthClient {
  login() {
    console.log("Mock Auth Client: Simulating login");
  }
}

class MockUserClient implements UserClient {
  me() {
    console.log("Mock User Client: Simulating fetching user data");
  }
}

class DevApiFactory implements ApiFactory {
  createAuthClient(): AuthClient {
    return new DevAuthClient();
  }
  createUserClient(): UserClient {
    return new DevUserClient();
  }
}

class ProdApiFactory implements ApiFactory {
  createAuthClient(): AuthClient {
    return new ProdAuthClient();
  }
  createUserClient(): UserClient {
    return new ProdUserClient();
  }
}

class MockApiFactory implements ApiFactory {
  createAuthClient(): AuthClient {
    return new MockAuthClient();
  }
  createUserClient(): UserClient {
    return new MockUserClient();
  }
}

function run(factory: ApiFactory) {
  const authClient = factory.createAuthClient();
  const userClient = factory.createUserClient();

  authClient.login();
  userClient.me();
}

run(new MockApiFactory());
run(new DevApiFactory());
run(new ProdApiFactory());
