// выставить задержку перед каким-либо действием
const setDelay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default setDelay;