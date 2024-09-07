let predictFileType = (fileName) => {
  let lastDot = fileName.lastIndexOf('.')
  let extension = fileName.substring(lastDot + 1).toLowerCase()

  // Group common file types
  const imageExtensions = ['png', 'jpg', 'jpeg', 'svg']
  const pdfExtensions = ['pdf']
  const excelExtensions = ['xlsx', 'xlsm', 'xlsb', 'xltx']
  const wordExtensions = ['docx', 'dot', 'dotx']
  const textExtensions = ['txt']
  const csvExtensions = ['csv']

  // Predict file type based on extension
  if (imageExtensions.includes(extension)) {
    return 'image_file'
  } else if (pdfExtensions.includes(extension)) {
    return 'pdf_file'
  } else if (
    pdfExtensions.includes(extension) ||
    imageExtensions.includes(extension)
  ) {
    return 'pdf_img_file'
  } else if (excelExtensions.includes(extension)) {
    return 'excel_file'
  } else if (wordExtensions.includes(extension)) {
    return 'word_file'
  } else if (textExtensions.includes(extension)) {
    return 'text_file'
  } else if (csvExtensions.includes(extension)) {
    return 'csv_file'
  } else {
    return 'other_file_type'
  }
}

export default predictFileType
