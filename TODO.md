# TODO

- [ ] Show end day window.
- [ ] Apply expenses.
- [ ] Show a game over screen.

- [ ] Remove outputs from steps.
- [ ] Add shortcuts:
  - [ ] `1`-`9` to choose resources.
  - [ ] `Esc` to hide buy buttons and to deselect resources.
- [ ] Add coordinate labels to the grid.
- [ ] Improve the design of the control panel.

- [x] Add raw materials to the chain.
- [x] Improve design of resources.
- [x] Extract default values to a loadable JSON-like structure.
- [x] Rewrite FactoryState in signals.
- [x] Change `Resource[][]` to `Resource[]`.
- [x] Make resources assignable.
- [x] Add step button to the control panel.
- [x] Add the ability to buy raw materials.
- [x] Make time movement.
- [x] Make the production logic.
- [x] Sell finished products.
- [x] Visualize setup.
- [x] Visualize production.
- [x] Visualize resource movement.
- [x] Fix overflow of steps.
- [x] Reset step.state when step.resourceId turns null.
- [x] Visualize money flow.
- [x] Figure out how to fix losing a resource when user moves a prod resource.

## Resource validation

- Every node must have either input or rawMaterial.
- Every node must have either output or finishedProduct.
