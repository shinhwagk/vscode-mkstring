import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "mkstring" is now active!');
	const disposable = vscode.commands.registerCommand('extension.mkstring', () => {
		const editor = vscode.window.activeTextEditor
		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			const sl = selection.start.line;
			const el = selection.end.line;

			const selectedLines = Array.from(Array(el - sl + 1).keys()).map(n => sl + n).map(l => document.lineAt(l).text)

			const mkstring = "(" + selectedLines.map(t => "\'" + t).map(t => t + "\'").join(",") + ")";
			editor.edit(editBuilder => editBuilder.replace(selection, mkstring));
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
