/* Define the chaincode class */
class EducationChaincode {
  /* Initialize the chaincode with the state database */
  async Init(stub) {
    console.info('=========== Instantiated EducationChaincode ===========');
    return shim.success();
  }

  /* Invoke a transaction on the chaincode */
  async Invoke(stub) {
    console.info('Transaction ID: ' + stub.getTxID());
    console.info(util.format('Args: %j', stub.getArgs()));

    /* Extract the function name and arguments from the transaction */
    let ret = stub.getFunctionAndParameters();
    let method = this[ret.fcn];
    if (!method) {
      console.error('Unknown function: ' + ret.fcn);
      throw new Error('Unknown function: ' + ret.fcn);
    }

    /* Invoke the function and return the result */
    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      console.error(err);
      return shim.error(err);
    }
  }

  /* Store a certificate on the ledger */
  async storeCertificate(stub, args) {
    /* Parse the certificate data from the arguments */
    let certificate = JSON.parse(args[0]);

    /* Verify that the certificate does not already exist */
    let existing = await stub.getState(certificate.id);
    if (existing && existing.toString()) {
      console.error('Certificate already exists: ' + certificate.id);
      throw new Error('Certificate already exists: ' + certificate.id);
    }

    /* Store the certificate on the ledger */
    await stub.putState(certificate.id, Buffer.from(JSON.stringify(certificate)));
    console.info('Stored certificate: ' + certificate.id);
  }

  /* Verify a certificate on the ledger */
  async verifyCertificate(stub, args) {
    /* Parse the certificate ID from the arguments */
    let id = args[0];

    /* Retrieve the certificate from the ledger */
    let existing = await stub.getState(id);
    if (!existing || !existing.toString()) {
      console.error('Certificate not found: ' + id);
      throw new Error('Certificate not found: ' + id);
    }

    /* Return the certificate data */
    let certificate = JSON.parse(existing.toString());
    console.info('Retrieved certificate: ' + certificate.id);
    return existing;
  }
}

/* Start the chaincode */
shim.start(new EducationChaincode());
