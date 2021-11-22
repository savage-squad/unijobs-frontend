export interface Module {
  name: string;
  code: string;
}

class ApplicationContext {
  _config: Map<string, string>;
  _modules: Module[];

  constructor() {
    this._config = new Map([]);
    this._modules = [];
  }

  get(key: string) {
    return this._config.get(key);
  }

  define(key: string, value: string) {
    this._config.set(key, value);
  }

  setModules(modules: Module[]) {
    this._modules = modules;
  }

  getModule(code: string): Module | null {
    for (const module of this._modules) {
      if (module.code === code) return module;
    }
    return null;
  }

  destroy() {
    this._modules = [];
    this._config = new Map([]);
  }
}

const applicationContext = new ApplicationContext();
export default applicationContext;
