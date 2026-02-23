import React from 'react';

export const PrintStyles: React.FC = () => {
    return (
        <style dangerouslySetInnerHTML={{
            __html: `
        @media print {
          /* Hide non-printable elements */
          nav, 
          footer, 
          button, 
          a[href^="mailto:"], 
          .animate-ping,
          .fixed,
          .absolute.left-1/2.-translate-x-1/2 { 
            display: none !important; 
          }
          
          /* Reset layout for print */
          main { 
            padding-top: 0 !important; 
            padding-bottom: 0 !important;
          }
          
          .bg-background { 
            background: white !important; 
            color: black !important; 
          }
          
          .text-white { 
            color: black !important; 
          }
          
          .text-accent-gold { 
            color: #856a1b !important; 
          }
          
          .text-foreground\\/60,
          .text-foreground\\/40,
          .text-foreground\\/70 {
            color: #333 !important;
          }
          
          /* Border & Card Handling */
          .border-white\\/10,
          .border-white\\/5 { 
            border-color: #eee !important; 
          }
          
          .bg-white\\/5,
          .bg-accent-gold\\/10,
          .bg-accent-gold\\/[0.02] { 
            background: transparent !important; 
          }
          
          .rounded-3xl, 
          .rounded-2xl { 
            border-radius: 8px !important; 
            border: 1px solid #eee !important;
          }
          
          /* Typography & Spacing */
          h1 { font-size: 32pt !important; }
          h2 { font-size: 24pt !important; margin-top: 20pt !important; }
          h3 { font-size: 18pt !important; }
          p { font-size: 11pt !important; line-height: 1.5 !important; }
          
          /* Page Breaks */
          section {
            page-break-inside: avoid;
            margin-bottom: 30pt !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          
          /* Motion & Transform Reset */
          .opacity-0,
          .translate-y-20 { 
            opacity: 1 !important; 
            transform: none !important; 
          }
          
          /* Timeline Adjustment for Print */
          .absolute.left-1/2.top-0 {
             display: none !important;
          }
          
          [class*="timeline-item-"] {
            transform: none !important;
            opacity: 1 !important;
            margin-bottom: 20pt !important;
          }
        }
      `
        }} />
    );
};
