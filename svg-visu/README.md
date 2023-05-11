# Graph Visualizer

This project is a web-based graph visualizer that allows you to input a graph and visualize it on a canvas. The visualization shows nodes as circles and edges as lines or curves connecting the nodes.

## Usage

To use the graph visualizer, follow these steps:

1. Open the `index.html` file in a web browser.
2. The input area is provided at the top of the page. Enter your graph data in the input area.
   - Each line represents a node or an edge in the graph.
   - To define a node, enter a single number.
   - To define an edge, enter two numbers separated by a space, representing the source and destination nodes.
   - Example:
     ```
      5 3
      6 2
      6 4
      7 1
      7 6
     ```
3. As you make changes in the input area, the graph visualization will update automatically in real-time.

## Dependencies

This project utilizes the following external dependencies:

The project utilizes the following dependencies:

- **jQuery**: A JavaScript library used for simplified DOM manipulation and event handling. It is included in the project through the following script tag:
  ```html
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
  ```

- **Canvas**: The HTML5 canvas element is used to draw the nodes and edges of the graph. It is included in the project through the following canvas tag:
  ```html
  <canvas id="circles_canvas"></canvas>
  ```

These dependencies are necessary for the proper functioning of the graph visualizer.

## Files

The project consists of the following files:

- `index.html`: The main HTML file that contains the structure and elements of the web page.
- `script.js`: The JavaScript file that handles the logic for parsing the input, generating the graph visualization, and drawing nodes and edges on the canvas.
- `style.css`: The CSS file that defines the styles for the elements in the web page.

## Customization

You can customize the appearance of the graph visualizer by modifying the CSS in the `style.css` file. The provided CSS defines styles for the canvas, input area, and other elements.

## Notes

- The graph visualizer uses the HTML5 canvas element to draw the nodes and edges.
- The size and position of the nodes and edges are determined based on the input graph data.
- Nodes are represented as circles with a fixed radius, and edges are drawn as lines or curves connecting the nodes.
- The graph visualization is automatically updated whenever changes are made in the input area.
- The visualization may not be optimized for large graphs with a high number of nodes or edges.

Feel free to explore and enhance this graph visualizer to suit your specific needs!
