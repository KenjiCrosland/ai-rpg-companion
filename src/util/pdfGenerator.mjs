import jsPDF from 'jspdf';

const marginLeft = 25;
const marginRight = 25;
const maxWidth = 160;

export function generatePDF(locations) {
  const doc = new jsPDF();

  function toSmallCaps(text, xPos, yPos, fontSize) {
    const smallCapScale = 0.8; // Scale factor for small caps
    let yOffset = 0; // Vertical offset for small caps
  
    text.split('').forEach((char, index) => {
      if (char.toUpperCase() !== char) {
        yOffset = fontSize * (1 - smallCapScale) * 0.5;
        doc.setFontSize(fontSize * smallCapScale);
        doc.text(char.toUpperCase(), xPos, yPos + yOffset);
        xPos += doc.getTextWidth(char.toUpperCase());
      } else {
        yOffset = fontSize * (1 - smallCapScale) * 0.5;
        doc.setFontSize(fontSize);
        doc.text(char, xPos, yPos + yOffset);
        xPos += doc.getTextWidth(char);
      }
    });
  }

  const printPageNumber = (pageNumber) => {
    const footerMargin = 10;
    const pageNumberText = `Page ${pageNumber}`;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(59, 58, 56);
    const pageNumberXPos = doc.internal.pageSize.width - 10 - doc.getTextWidth(pageNumberText);
    const pageNumberYPos = doc.internal.pageSize.height - footerMargin;
    doc.text(pageNumberText, pageNumberXPos, pageNumberYPos);
    doc.setFontSize(10);
  };
  
  const printRelationshipHeader = () => {
    doc.setTextColor(8, 8, 8);
    printParagraphs("Relationships", "times", 12, 5, true);
  };
  
  const printRelationships = (relationships) => {
    const relationshipMarginLeft = marginLeft + 5; // Indent relationships
    const relationshipMaxWidth = maxWidth - 15; // Adjust width for relationships
  
    Object.entries(relationships).forEach(([relationshipName, relationshipDescription], index) => {
      doc.setFont("helvetica", "bold");
      const relationshipNameWidth = doc.getTextWidth(relationshipName);
      checkForNewPage(6);
      doc.text(relationshipName, relationshipMarginLeft, y);
  
      doc.setFont("helvetica", "normal");
      const relationshipText = `: ${relationshipDescription}`;
      const relationshipLines = doc.splitTextToSize(relationshipText, relationshipMaxWidth);
  
      relationshipLines.forEach((line, lineIndex) => {
        checkForNewPage(6);
        if (lineIndex === 0) {
          doc.text(line, relationshipMarginLeft + relationshipNameWidth, y);
        } else {
          doc.text(line, relationshipMarginLeft, y);
        }
        if (lineIndex === relationshipLines.length - 1) {
          if (index < Object.keys(relationships).length - 1) {
            y += 10;
          }
        } else {
          y += 6;
        }
      });
    });
  };
  
  

  const setBackgroundColor = () => {
    doc.setFillColor(244, 242, 237); // RGB values for #f4f2ed
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  };

  let y = 20;

  const checkForNewPage = (neededSpace) => {
    if (y + neededSpace >= doc.internal.pageSize.height) {
      printPageNumber(doc.internal.getNumberOfPages()); // Print current page number before adding a new page
      doc.addPage();
      setBackgroundColor();
      y = 20;
    }
  };

  const printParagraphs = (text, fontStyle, fontSize, spacingAfter, useSmallCaps) => {
    doc.setFont(fontStyle, "normal");
    doc.setFontSize(fontSize);
    const paragraphs = text.split('\n');
  
    paragraphs.forEach((paragraph, index) => {
      const lines = doc.splitTextToSize(paragraph, maxWidth);
      checkForNewPage(lines.length * 5);
      lines.forEach(line => {
        if (useSmallCaps) {
          toSmallCaps(line, marginLeft, y, fontSize);
        } else {
          doc.text(line, marginLeft, y);
        }
        y += 6;
      });
      if (index < paragraphs.length - 1) {
        y += 3; // Add extra space between paragraphs
      }
    });
    y += spacingAfter;
  };

  const drawHorizontalDivider = () => {
    y -= 5;
    checkForNewPage(10);
    doc.setLineWidth(0.3); // Set line width to be a little thinner
    doc.setDrawColor(203, 197, 183); // Set line color to #CBC5B7
    doc.line(marginLeft, y, marginLeft + maxWidth, y);
    y += 10;
  };

  setBackgroundColor();

  locations.forEach((location, locationIndex) => {
    doc.setTextColor(8,8,8);
    printParagraphs(location.name, "times", 24, 5, true);
    doc.setTextColor(59, 58, 56);
    printParagraphs(location.description, "helvetica", 10, 5);
    
    if (location.npcs.length) {
      doc.setTextColor(8,8,8);
      printParagraphs(`NPCs In ${location.name}`, "times", 16, 5, true);

      location.npcs.forEach((npc) => {
        doc.setTextColor(8,8,8);
        printParagraphs(npc.character_name, "times", 14, 5, true);
        doc.setTextColor(59, 58, 56);
        printParagraphs(
          `${npc.description_of_position}\n${npc.reason_for_being_there}\n${npc.distinctive_feature_or_mannerism}\n${npc.character_secret}`,
          "helvetica",
          10,
          5
        );
        if (npc.relationships) {
            printRelationshipHeader();
            printRelationships(npc.relationships);
            y += 10;
          }
      });
    }

    if (locationIndex < locations.length - 1) {
      drawHorizontalDivider();
    }
  });

  // Print page number on the last page
  printPageNumber(doc.internal.getNumberOfPages());
  
//   const pdfDataURI = doc.output('datauristring');
//   window.open(pdfDataURI);
  doc.save("dashboard.pdf");
}
