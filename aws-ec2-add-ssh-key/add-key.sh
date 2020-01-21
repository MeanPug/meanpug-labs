#!/bin/bash
## Dependencies:
## * jq (https://stedolan.github.io/jq/)
## * aws CLI (https://aws.amazon.com/cli/) 
## Author: Bobby Steinbach

add_ssh_key() {
	# params: $1 = host, $2 = the path to the ssh public key to upload, $3 = path to ssh identity file
	echo "now adding ssh key to ubuntu@$1"
	cat "$2" | ssh -oStrictHostKeyChecking=no -i "$3" ubuntu@$1 'cat >> ~/.ssh/authorized_keys'
}

export -f add_ssh_key

# Command Args: $1 = path to ssh public key to upload, $2 = path to ssh identity file (defaults to ~/.ssh/id_rsa)
UPLOAD_KEY=$1
SSH_IDENTITY_FILE=${2:-~/.ssh/id_rsa}
ADDITIONAL_INSTANCE_FILTERS=$3
echo "command args: UPLOAD_KEY = $UPLOAD_KEY, SSH_IDENTITY_FILE = $SSH_IDENTITY_FILE, ADDITIONAL_INSTANCE_FILTERS = $ADDITIONAL_INSTANCE_FILTERS"

aws ec2 describe-instances --filters "$ADDITIONAL_INSTANCE_FILTERS" | \
jq -r '.Reservations|map(.Instances)|flatten|map(.PublicDnsName)|.[]' | \
xargs -I '{}' -P 4 -t bash -c "add_ssh_key '{}' $UPLOAD_KEY $SSH_IDENTITY_FILE"
