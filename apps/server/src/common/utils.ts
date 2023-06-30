export function getVariableName<TResult>(getVar: () => TResult): string {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  const m = /\(\)=>(.*)/.exec(getVar.toString().replace(/(\r\n|\s)/g, ''));

  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'"
    );
  }

  const fullMemberName = m[1];

  const memberParts = fullMemberName.split('.');

  return memberParts[memberParts.length - 1];
}
