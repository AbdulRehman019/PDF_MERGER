
import PDFMerger from 'pdf-merger-js';

var merger = new PDFMerger();

const mergedPdf = async (p1, p2) => {
  // Merge both Pdf
  await merger.add(p1); 
  await merger.add(p2);

  // Save the merged Pdf at public/merged.pdf
  await merger.save('public/merged.pdf');
  
};

export default mergedPdf;