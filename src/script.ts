// Importing modules
import * as fs from 'fs';
import * as path from 'path';

// Defining interfaces for data structures
interface MOTEntry {
    mnemonic: string;
    opcode: string;
    length: number;
    format: string;
}

interface Literal {
    name: string;
    value: string;
    location: number | undefined;
}

interface Context {
    locationCounter: number;
    symbolTable: {
        [key: string]: number;
    };
    literalTable: Literal[];
    literalCounter: number;
    currentLabel: string | undefined;
}

// Load and Parse the mot.json file
const motData:string = fs.readFileSync(path.join(__dirname,'../data/mot.json'),'utf-8');
const mot:MOTEntry[] = JSON.parse(motData).MOT;

// Function to read assembly input from a file
function readFile(inputFilePath:string):string[] {
    return fs.readFileSync(inputFilePath,'utf-8').split('\n');
}

// function to find entry in MOT based on mnemonic
function findMOTEntry(mnemonic:string):MOTEntry | undefined {
     return mot.find(function (entry) {
        return entry.mnemonic === mnemonic;
     });
}

// function to precess the literals found in assembly input
function processLiteral(operand:string, context:Context):void {
    const literalValue:string = operand.slice(operand.indexOf("'") + 1, operand.length - 1);
    const literalName:string = `=L${context.literalCounter++}`;
    context.literalTable.push({
        name:literalName,
        value:literalValue,
        location:context.locationCounter
    });
    context.locationCounter += 1;
}

// functions to process Pseudo opcodes that affect symbol-table,literal-table or location-counter
function processPseudoOps(opcode:string, operand: string | undefined, context:Context):void {
    switch (opcode) {
        case 'DC':
            if (operand && context.currentLabel) {
                context.symbolTable[context.currentLabel] = context.locationCounter;
                context.locationCounter += 1;
            }
            break;
        case 'DS':
            if (operand && context.currentLabel) {
                const size = parseInt(operand.slice(0, -1));
                context.symbolTable[context.currentLabel] = context.locationCounter;
                context.locationCounter += size; // Adjust LC
            }
            break;
        case 'EQU':
            if (operand && context.currentLabel) {
                const value = parseInt(operand);
                context.symbolTable[context.currentLabel] = value;
            }
            break;
        case 'LTORG':
        case 'END':
            context.literalTable.forEach(function(literal) {
                if (literal.location === undefined) {
                    literal.location = context.locationCounter;
                    context.locationCounter += 1;
                }
            });
            break;
        default:
            throw new Error("Invalid Opcode");
    }
}

function processLine(line: string, context: Context):string {
    const parts = line.split(/\s+/);
    context.currentLabel = parts[0] !== '' ? parts.shift() : undefined;
    const opcode = parts.shift() || '';
    const operand = parts.join(' ');
    
    // Update the symbol table for label
    if(context.currentLabel) {
        context.symbolTable[context.currentLabel] = context.locationCounter;
    }

    // check for pseudo opcodes
    if(opcode === 'DC' || opcode === 'DS' || opcode === 'EQU') {
        processPseudoOps(opcode,operand,context);
    } 
    else if(operand.startsWith('=')) {
        processLiteral(operand,context);
    }
    else {
        const motEntry = findMOTEntry(opcode);
        if(motEntry) {
            context.locationCounter += motEntry.length;
        }
    }
    

    return `${context.currentLabel || ''} ${opcode} ${operand} ; LC=${context.locationCounter}`;
}

function writeOutput(outputFilePath:string, outputLines:string[],context:Context):void {
    // Str - String
    const symbolTableStr = Object.entries(context.symbolTable)
          .map(function([label,address]):string {
              return `${label}: ${address}`
          }).join('\n');
    const literalTableStr = context.literalTable
          .map(function(literal):string {
              return `${literal.name}: ${literal.value} at ${literal.location}`
          }).join('\n');

    const outputContent = outputLines.join('\n') + '\n\nSymbol Table:\n' + symbolTableStr + '\n\nLitreal Table\n' + literalTableStr;
    fs.writeFileSync(outputFilePath,outputContent);
}

function pass1Assembler(inputFilePath:string,outputFilePath:string):void {
    const lines = readFile(inputFilePath);
    let context:Context = {
        locationCounter: 0,
        symbolTable: {},
        literalTable: [],
        literalCounter: 0,
        currentLabel: undefined,
    };
    const outputLines = lines.map(function(line) {
        return processLine(line,context); // Fix: Return the processed line
    });
    writeOutput(outputFilePath,outputLines,context);
    console.log('Pass 1 Assembler completed. Output, Symbol Tabel, and Literal Table written to:',outputFilePath);
}

const inputFilePath:string = path.join(__dirname,'../out/input.txt');
const outputFilePath:string = path.join(__dirname,'../out/output.txt');
pass1Assembler(inputFilePath,outputFilePath);