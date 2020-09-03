import * as assert from 'assert';
import * as vscode from 'vscode';
import * as f from '../../extension';

suite('Flatten SQL Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Basic Flattener', () => {
    const
    s1 = `
      Select
      -- all columns
      *
      From
      test
      Where
      -- test 1 == 2?
      1 = 2
      ;
		`,
    r1 = 'Select /*  all columns */ * From test Where /*  test 1 == 2? */ 1 = 2 ;'
    assert.equal(r1, f.flattenSQL(s1));
  });

	test('Add semicolon', () => {
    const
    s2 = `
      Select
      -- all columns
      *
      From
      test
		`,
    r2 = 'Select /*  all columns */ * From test ;'
    assert.equal(r2, f.flattenSQL(s2));
  });

	test('Embedded inline comment', () => {
    const
    s2 = `
      Select
      *
      From
      test /* -- bad comment */

        Where -- 1 doesn't equal 3
          1 = 3
          ;
		`,
    r2 = "Select * From test /* -- bad comment */ Where /*  1 doesn't equal 3 */ 1 = 3 ;"
    assert.equal(r2, f.flattenSQL(s2));
	});
});