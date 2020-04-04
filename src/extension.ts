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

			let sl_l = "(", sl_r = ")", sl_s = ",", sl_c = "'", isSymbls = false;
			const firstLineText = document.lineAt(sl).text;
			if (firstLineText.startsWith('#')) {
				const symbols = firstLineText.split(" ");
				sl_l = symbols[1], sl_r = symbols[2], sl_s = symbols[3], sl_c = symbols[4], isSymbls = true;
			}

			const selectedLines = Array.from(Array(el - sl + 1).keys()).map(n => sl + n).map(l => document.lineAt(l).text);
			if (isSymbls) { selectedLines.shift(); }
			const mkstring = sl_l + selectedLines.map(t => sl_c + t).map(t => t + sl_c).join(sl_s) + sl_r;
			editor.edit(editBuilder => editBuilder.replace(selection, mkstring));
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
