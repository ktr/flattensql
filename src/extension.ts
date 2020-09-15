import * as vscode from 'vscode';
export { flattenSQL }

const msg = vscode.window.showInformationMessage

function flattenSQL(txt: string, eol = `\r\n`): string {
  const
    // comments = new RegExp('--([^\r\n]*)$', 'g'),
    sql = txt
      // trim leading whitespace
      .replace(/^\s+/gm, '')
      // replace comments
      .replace(/--([^\r\n]*)(:?\*\/)?.*$/gm, '/* $1 */')
      // turn newlines into spaces
      .replace(/(?:\r\n|\r|\n)/g, ' ')
      // add semicolon (if needed)
      .replace(/\s*;?\s+$/, ' ;')
      // inline embedded inline comments
      .replace(/\/\* \/\* ([^*]+)\*\/ \*\//g, '/* --$1*/')
  return sql
}

function getText(editor: vscode.TextEditor): [string, '\r\n' | '\n'] {
  const
    sel = editor.selection,
    doc = editor.document,
    txt = sel.isEmpty ? doc.getText() : doc.getText(sel.with()),
    eol = doc.eol === vscode.EndOfLine.CRLF ? `\r\n` : `\n`
  return [txt, eol]
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Activated "flattensql"');

  let disposable = vscode.commands.registerCommand('flattensql.flattenSQL', () => {
    const editor = vscode.window.activeTextEditor
    if (editor === undefined) {
      msg("No active editor - can't flatten sql")
    } else {
      const
        doc = editor.document,
        lang = doc.languageId // sql?
      const sql = flattenSQL(...getText(editor))
      vscode.env.clipboard.writeText(sql)
        .then(() => msg('Flattened SQL, copied to clipboard!'))
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }