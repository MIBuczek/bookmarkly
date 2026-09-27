const { execSync } = require('child_process');

async function loadTask() {
  const issueNumber = process.argv[2];
  if (!issueNumber) {
    console.error('Usage: npm run junie:load-task -- <issue_number>');
    process.exit(1);
  }

  try {
    // Check if gh is installed
    execSync('gh --version', { stdio: 'ignore' });
  } catch (e) {
    console.error('Error: GitHub CLI (gh) is not installed. Please install it (e.g., brew install gh).');
    process.exit(1);
  }

  try {
    // Check if jq is installed
    execSync('jq --version', { stdio: 'ignore' });
  } catch (e) {
    console.error('Error: jq is not installed. Please install it (e.g., brew install jq).');
    process.exit(1);
  }

  try {
    // Check if gh is authenticated
    execSync('gh auth status', { stdio: 'ignore' });
  } catch (e) {
    console.error('Error: GitHub CLI is not authenticated. Please run "gh auth login".');
    process.exit(1);
  }

  try {
    console.log(`Fetching issue #${issueNumber}...`);
    const command = `gh issue view ${issueNumber} --json body --jq .body | junie`;
    execSync(command, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Error: Failed to fetch or process issue #${issueNumber}.`);
    process.exit(1);
  }
}

loadTask();
