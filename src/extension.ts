import * as vscode from 'vscode';

function getFileProblems(): string[] {
    const diagnostics: string[] = [];
    
    // Get the active editor
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        vscode.window.showInformationMessage('No active editor found.');
        return [];
    }

    const uri = activeEditor.document.uri;
    const fileDiagnostics = vscode.languages.getDiagnostics(uri);
    
    // Filter only error diagnostics
    const problems = fileDiagnostics.filter(d => d.severity === vscode.DiagnosticSeverity.Error);
    
    if (problems.length > 0) {
        diagnostics.push(`File: ${vscode.workspace.asRelativePath(uri)}`);
        problems.forEach(problem => {
            const line = problem.range.start.line + 1;
            const column = problem.range.start.character + 1;
            diagnostics.push(`  Line ${line}, Column ${column}: ${problem.message}`);
        });
    }

    return diagnostics;
}

export function activate(context: vscode.ExtensionContext) {
    let disposable1 = vscode.commands.registerCommand('derptoclipboard.copyProblems', async () => {
        const diagnostics = getFileProblems();
        
        if (diagnostics.length === 0) {
            vscode.window.showInformationMessage('No problems found in current file.');
            return;
        }

        const problemText = diagnostics.join('\n');
        await vscode.env.clipboard.writeText(problemText);
        vscode.window.showInformationMessage('All problems have been copied to clipboard!');
    });

    let disposable2 = vscode.commands.registerCommand('derptoclipboard.copyProblemsWithIntro', async () => {
        const diagnostics = getFileProblems();
        
        if (diagnostics.length === 0) {
            vscode.window.showInformationMessage('No problems found in current file.');
            return;
        }

        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            vscode.window.showInformationMessage('No active editor found.');
            return;
        }
        const fileName = vscode.workspace.asRelativePath(activeEditor.document.uri);
        const problemText = `I have these problems in my file "${fileName}":\n\n${diagnostics.join('\n')}`;
        await vscode.env.clipboard.writeText(problemText);
        vscode.window.showInformationMessage('All problems have been copied to clipboard with introduction!');
    });

    let disposable3 = vscode.commands.registerCommand('derptoclipboard.copyProblemsWithContent', async () => {
        const diagnostics = getFileProblems();
        const activeEditor = vscode.window.activeTextEditor;
        
        if (!activeEditor) {
            vscode.window.showInformationMessage('No active editor found.');
            return;
        }
        
        if (diagnostics.length === 0) {
            vscode.window.showInformationMessage('No problems found in current file.');
            return;
        }

        const fileName = vscode.workspace.asRelativePath(activeEditor.document.uri);
        const fileContent = activeEditor.document.getText();
        const problemText = `I have these problems in my file "${fileName}":\n\n${diagnostics.join('\n')}\n\n=== File Content ===\n\n${fileContent}\n\n=== End of File Content ===`;
        await vscode.env.clipboard.writeText(problemText);
        vscode.window.showInformationMessage('All problems and file content have been copied to clipboard!');
    });

    context.subscriptions.push(disposable1, disposable2, disposable3);
}

export function deactivate() {}