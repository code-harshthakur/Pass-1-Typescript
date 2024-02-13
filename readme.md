# <p align="center">Pass 1 in Typescript</p>

## Description 
 The TypeScript Assembler Project bridges traditional assembly language processing with modern TypeScript, offering a robust tool for compiling and parsing assembly instructions. It simplifies symbol and literal table management, streamlines memory assignments, and generates structured outputs. This project combines low-level programming's precision with TypeScript's clarity, making it ideal for educational purposes and enhancing programming tasks.

## 🧐 Features    
- **Assembles Assembly Language Input**: Processes an assembly language input file, interpreting lines according to operation codes and pseudo-operations, and updates the context accordingly.

- **Symbol and Literal Table Management**: Dynamically generates and updates symbol and literal tables, assigning memory locations to labels and literals found within the assembly input.

- **Output Generation**: Compiles the processed assembly instructions along with the final symbol and literal tables into a structured output, saved to a specified file.



## 🛠️ Tech Stack
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [VS Code](https://code.visualstudio.com/)


## 📚 Documentation

The project is well-documented with comments explaining the key sections of the code. The `processLine` function, responsible for processing each line of the assembly code, is particularly important. It takes a line of assembly code and a context object as arguments, and returns the processed line.

The `pass1Assembler` function is the main function that reads the input file, processes each line, and writes the processed lines to the output file. It takes two arguments: `inputFilePath` and `outputFilePath`, which are the paths to the input and output files, respectively.

### 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

### 📧 Contact

If you have any questions, issues, or if you want to contribute, feel free to reach out to us. You can contact us at `your-email@example.com`.

### 🌟 Acknowledgements

We would like to thank all the contributors who have been part of this project. Your contributions have played a major role in advancing this project to its current state.

# 📖 References

For more information about assembly language and assemblers, you can refer to the following resources:

- [Assembly Algo and Other Concepts](https://drive.google.com/file/d/1g1X07nTmYbHtFOElTQIjeE9PcibVWyWc/view?usp=drive_link)

Remember, contributions are not just about code - we're happy for people to contribute in any way they can, whether that's improving documentation, submitting bug reports or feature requests, or just spreading the word!


## 🍰 Contributing    
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Before contributing, please read the [code of conduct](CODE_OF_CONDUCT.md) & [contributing guidelines](CONTRIBUTING.md).

To contribute to this project, follow these steps:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

Please ensure your pull request adheres to the following guidelines:
- Follow the coding style of the project.
- Ensure any new dependencies are properly documented in the project.
- Test your changes thoroughly.

Thank you for your contributions!