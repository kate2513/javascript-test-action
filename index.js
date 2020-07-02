const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	try {	  
	  const messageToSent = core.getInput('message');
	  const github_token = core.getInput('GITHUB_TOKEN');
	  const context = github.context;
	  
	  if (context.payload.pull_request == null){
		  core.setFailed('No PR found!');
		  return;
	  }
	  
	  const pull_request_number = context.payload.pull_request_number;
	  
	  const octokit = github.getOctokit(github_token);
	  const comment = octokit.issues.createComment({
		  ...context.repo,
		  issue_number: pull_request_number,
		  body: message
	  });  

	} catch (error) {
	  core.setFailed(error.message);
	}
}

run();