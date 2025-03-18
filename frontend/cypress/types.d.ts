declare namespace Cypress {
    // Precy.io ------------------------------------------------------
    interface SnapshotOptions {
      domTransformation: (documentClone: Document) => void;
    }
  
    interface Chainable {
      percySnapshotElement(name?: string, options?: SnapshotOptions);
    }
    // ---------------------------------------------------------------
  }