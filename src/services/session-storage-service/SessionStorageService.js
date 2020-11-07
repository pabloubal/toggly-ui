const OP_NAME = "operation-status"

const SessionStorageService = {
  pick() {
    return sessionStorage.getItem(OP_NAME);
  },
  pop() {
    const tmp = JSON.parse(sessionStorage.getItem(OP_NAME));
    sessionStorage.removeItem(OP_NAME);
    return tmp;
  },
  push(state){
    sessionStorage.setItem(OP_NAME, JSON.stringify(state))
  }
}

export default SessionStorageService;