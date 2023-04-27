This is where your converted model should go.
It should look like:
- model.json
- group`X`-shard`X`of`X`.bin
- group`X`-shard`X`of`X`.bin
- ...


The model used when writing this example was a mobilenetv3 model trained in keras and converted with:
  ```bash
  tensorflowjs_converter `
  --input_format=tf_saved_model `
  --output_format=tfjs_graph_model `
  ./path/to/your/model/folder `
  ./path/to/output/folder
  ```