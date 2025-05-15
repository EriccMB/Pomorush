let isRunning = false;

self.onmessage = function (event) {
  // se já tiver um work funcionando, ele nao executa
  if (isRunning) return;

  // seta isRuning para true,para garantir que não haja outro worker
  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  // pega a data que a task começou, acrescenta com os seconsRemaining
  const endDate = activeTask.startDate + secondsRemaining * 1000;
  const now = Date.now();
  // tempo restante da task, hora que termina - a hora atual
  let countDownSeconds = Math.ceil((endDate - now) / 1000);

  const tick = () => {
    self.postMessage(countDownSeconds);
    const now = Date.now();
    countDownSeconds = Math.floor((endDate - now) / 1000);
    setTimeout(tick, 1000);
  };
  tick();
};
