function* flattenComponents(nestedComponents:any, pathPrefix:any):any {
    for (const { routes: routes, path, ...component } of nestedComponents) {
      const newPath = `${path}`;
      yield { ...component, path: newPath };
      if (routes) {
        yield* flattenComponents(routes, newPath);
      }
    }
  }
