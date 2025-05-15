// PADRÃO DE PROJETO SINGLETON
// CRIANDO UMA CLASSE E COLOCANDO A INSTANCIA COMO PRIVADA

import { TaskStateModel } from "../models/TaskStateModel";

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL('./timeWorker.js', import.meta.url));
  }

  static getInstance() {
    if (!instance) {
      instance = new TimerWorkerManager();
    }

    return instance;
  }

  postMessage(message: TaskStateModel) {
    this.worker.postMessage(message);
  }

  onmessage(cb: (e: MessageEvent) => void) {
    // AQUI FICA =, PORQUE O WORKER RECEBE UMA FUNÇÃO DE CALLBACK
    this.worker.onmessage = cb;
  }

  terminate() {
    this.worker.terminate();
    instance = null;
  }
}
