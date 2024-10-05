# TODO

- [ ] Remove outputs from steps.
- [ ] Sell finished products.
- [ ] Visualize setup.
- [ ] Visualize production.
- [ ] Visualize resource movement.
- [ ] Visualize money flow.
- [ ] Redesign money labels as small badges, maybe?
- [ ] Add coordinate labels to the grid.
- [ ] Improve the design of the control panel.
- [ ] Fix overflow of steps.

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

## Resource validation

- Every node must have either input or rawMaterial.
- Every node must have either output or finishedProduct.
