export const analyzeImageForEmptySpace = (file: File): Promise<{ logoPos: {x:number, y:number}, numberPos: {x:number, y:number} }> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        resolve({ logoPos: {x: 10, y: 10}, numberPos: {x: 50, y: 88} });
        return;
      }
      
      // Scale down for much faster processing
      const scale = Math.min(1, 400 / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        
        // Helper to calculate variance (busyness) of a region
        const getVariance = (xPct: number, yPct: number, wPct: number, hPct: number) => {
          const startX = Math.floor(canvas.width * (xPct/100));
          const startY = Math.floor(canvas.height * (yPct/100));
          const endX = Math.floor(canvas.width * ((xPct+wPct)/100));
          const endY = Math.floor(canvas.height * ((yPct+hPct)/100));
          
          let sumR = 0, sumG = 0, sumB = 0;
          let count = 0;
          
          for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
               const i = (y * canvas.width + x) * 4;
               sumR += data[i];
               sumG += data[i+1];
               sumB += data[i+2];
               count++;
            }
          }
          
          if (count === 0) return Infinity;
          
          const avgR = sumR / count;
          const avgG = sumG / count;
          const avgB = sumB / count;
          
          let variance = 0;
          for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
               const i = (y * canvas.width + x) * 4;
               // Simple Manhattan distance for variance estimation
               variance += Math.abs(data[i] - avgR) + Math.abs(data[i+1] - avgG) + Math.abs(data[i+2] - avgB);
            }
          }
          return variance / count;
        };

        // Define candidate spots for number box (mostly bottom area)
        const numCandidates = [
          { pos: {x: 50, y: 88}, region: {x: 35, y: 80, w: 30, h: 15} }, // Bottom Center
          { pos: {x: 85, y: 88}, region: {x: 70, y: 80, w: 30, h: 15} }, // Bottom Right
          { pos: {x: 15, y: 88}, region: {x: 0,  y: 80, w: 30, h: 15} }, // Bottom Left
          { pos: {x: 50, y: 12}, region: {x: 35, y: 5,  w: 30, h: 15} }, // Top Center (fallback)
        ];

        let bestNum = numCandidates[0].pos;
        let minNumVar = Infinity;
        for (const c of numCandidates) {
          const v = getVariance(c.region.x, c.region.y, c.region.w, c.region.h);
          if (v < minNumVar) {
            minNumVar = v;
            bestNum = c.pos;
          }
        }

        URL.revokeObjectURL(url);
        resolve({ logoPos: {x: 10, y: 10}, numberPos: bestNum });
      } catch (e) {
        URL.revokeObjectURL(url);
        resolve({ logoPos: {x: 10, y: 10}, numberPos: {x: 50, y: 88} });
      }
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ logoPos: {x: 10, y: 10}, numberPos: {x: 50, y: 88} });
    };
    
    img.src = url;
  });
};
