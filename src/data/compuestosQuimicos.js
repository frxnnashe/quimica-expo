export const compuestosQuimicos = [
    {
        formula: "H₂O",
        nombre: "Agua",
        elementosNecesarios: { H: 2, O: 1 }, // Cantidad de cada elemento necesaria
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Dos enlaces simples O-H"
    },
    {
        formula: "CO₂",
        nombre: "Dióxido de Carbono",
        elementosNecesarios: { C: 1, O: 2 },
        tipoEnlace: "Covalente No Polar", // Aunque los enlaces C-O son polares, la molécula es no polar
        detallesEnlace: "Dos enlaces dobles C=O"
    },
    {
        formula: "NaCl",
        nombre: "Cloruro de Sodio",
        elementosNecesarios: { Na: 1, Cl: 1 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "NH₃",
        nombre: "Amoníaco",
        elementosNecesarios: { N: 1, H: 3 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Tres enlaces simples N-H"
    },
    {
        formula: "CH₄",
        nombre: "Metano",
        elementosNecesarios: { C: 1, H: 4 },
        tipoEnlace: "Covalente No Polar",
        detallesEnlace: "Cuatro enlaces simples C-H"
    },
    {
        formula: "O₂",
        nombre: "Oxígeno Molecular",
        elementosNecesarios: { O: 2 },
        tipoEnlace: "Covalente No Polar",
        detallesEnlace: "Un enlace doble O=O"
    },
    {
        formula: "N₂",
        nombre: "Nitrógeno Molecular",
        elementosNecesarios: { N: 2 },
        tipoEnlace: "Covalente No Polar",
        detallesEnlace: "Un enlace triple N≡N"
    },
    {
        formula: "HCl",
        nombre: "Ácido Clorhídrico",
        elementosNecesarios: { H: 1, Cl: 1 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Un enlace simple H-Cl"
    },
    {
        formula: "MgCl₂",
        nombre: "Cloruro de Magnesio",
        elementosNecesarios: { Mg: 1, Cl: 2 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "H₂SO₄",
        nombre: "Ácido Sulfúrico",
        elementosNecesarios: { H: 2, S: 1, O: 4 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Múltiples enlaces simples O-H, S-O y dobles S=O"
    },
    {
        formula: "CO",
        nombre: "Monóxido de Carbono",
        elementosNecesarios: { C: 1, O: 1 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Un enlace triple C≡O"
    },
    {
        formula: "H₂",
        nombre: "Hidrógeno Molecular",
        elementosNecesarios: { H: 2 },
        tipoEnlace: "Covalente No Polar",
        detallesEnlace: "Un enlace simple H-H"
    },
    {
        formula: "Cl₂",
        nombre: "Cloro Molecular",
        elementosNecesarios: { Cl: 2 },
        tipoEnlace: "Covalente No Polar",
        detallesEnlace: "Un enlace simple Cl-Cl"
    },
    {
        formula: "CH₃OH",
        nombre: "Metanol",
        elementosNecesarios: { C: 1, H: 4, O: 1 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Enlaces simples C-H, C-O, O-H"
    },
    {
        formula: "C₂H₅OH",
        nombre: "Etanol",
        elementosNecesarios: { C: 2, H: 6, O: 1 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Enlaces simples C-C, C-H, C-O, O-H"
    },
    {
        formula: "C₆H₁₂O₆",
        nombre: "Glucosa",
        elementosNecesarios: { C: 6, H: 12, O: 6 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Múltiples enlaces simples C-C, C-H, C-O, O-H"
    },
    {
        formula: "H₂O₂",
        nombre: "Peróxido de Hidrógeno",
        elementosNecesarios: { H: 2, O: 2 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Enlaces simples O-O y O-H"
    },
    {
        formula: "SO₂",
        nombre: "Dióxido de Azufre",
        elementosNecesarios: { S: 1, O: 2 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Un enlace doble S=O, un enlace simple S-O"
    },
    {
        formula: "SO₃",
        nombre: "Trióxido de Azufre",
        elementosNecesarios: { S: 1, O: 3 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Un enlace doble S=O, dos enlaces simples S-O"
    },
    {
        formula: "CaO",
        nombre: "Óxido de Calcio",
        elementosNecesarios: { Ca: 1, O: 1 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "KOH",
        nombre: "Hidróxido de Potasio",
        elementosNecesarios: { K: 1, O: 1, H: 1 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico K-O, enlace covalente O-H"
    },
    {
        formula: "NaOH",
        nombre: "Hidróxido de Sodio",
        elementosNecesarios: { Na: 1, O: 1, H: 1 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico Na-O, enlace covalente O-H"
    },
    {
        formula: "CaCO₃",
        nombre: "Carbonato de Calcio",
        elementosNecesarios: { Ca: 1, C: 1, O: 3 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico Ca-CO₃, enlaces covalentes C-O"
    },
    {
        formula: "Na₂CO₃",
        nombre: "Carbonato de Sodio",
        elementosNecesarios: { Na: 2, C: 1, O: 3 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico Na-CO₃, enlaces covalentes C-O"
    },
    {
        formula: "KNO₃",
        nombre: "Nitrato de Potasio",
        elementosNecesarios: { K: 1, N: 1, O: 3 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico K-NO₃, enlaces covalentes N-O"
    },
    {
        formula: "AgNO₃",
        nombre: "Nitrato de Plata",
        elementosNecesarios: { Ag: 1, N: 1, O: 3 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico Ag-NO₃, enlaces covalentes N-O"
    },
    {
        formula: "Fe₂O₃",
        nombre: "Óxido de Hierro(III)",
        elementosNecesarios: { Fe: 2, O: 3 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "Al₂O₃",
        nombre: "Óxido de Aluminio",
        elementosNecesarios: { Al: 2, O: 3 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "SiO₂",
        nombre: "Dióxido de Silicio (Cuarzo)",
        elementosNecesarios: { Si: 1, O: 2 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Dos enlaces dobles Si=O o cuatro enlaces simples Si-O en red"
    },
    {
        formula: "N₂O",
        nombre: "Óxido Nitroso (Gas de la Risa)",
        elementosNecesarios: { N: 2, O: 1 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Un enlace doble N=N, un enlace simple N-O"
    },
    {
        formula: "C₂H₂",
        nombre: "Acetileno",
        elementosNecesarios: { C: 2, H: 2 },
        tipoEnlace: "Covalente No Polar",
        detallesEnlace: "Un enlace triple C≡C, dos enlaces simples C-H"
    },
    {
        formula: "C₂H₄",
        nombre: "Etileno",
        elementosNecesarios: { C: 2, H: 4 },
        tipoEnlace: "Covalente No Polar",
        detallesEnlace: "Un enlace doble C=C, cuatro enlaces simples C-H"
    },
    {
        formula: "C₂H₆",
        nombre: "Etano",
        elementosNecesarios: { C: 2, H: 6 },
        tipoEnlace: "Covalente No Polar",
        detallesEnlace: "Un enlace simple C-C, seis enlaces simples C-H"
    },
    {
        formula: "HCN",
        nombre: "Ácido Cianhídrico",
        elementosNecesarios: { H: 1, C: 1, N: 1 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Un enlace simple C-H, un enlace triple C≡N"
    },
    {
        formula: "HNO₃",
        nombre: "Ácido Nítrico",
        elementosNecesarios: { H: 1, N: 1, O: 3 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Múltiples enlaces N-O y O-H"
    },
    {
        formula: "H₃PO₄",
        nombre: "Ácido Fosfórico",
        elementosNecesarios: { H: 3, P: 1, O: 4 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Múltiples enlaces P-O y O-H"
    },
    {
        formula: "K₂SO₄",
        nombre: "Sulfato de Potasio",
        elementosNecesarios: { K: 2, S: 1, O: 4 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico K-SO₄, enlaces covalentes S-O"
    },
    {
        formula: "Na₂SO₄",
        nombre: "Sulfato de Sodio",
        elementosNecesarios: { Na: 2, S: 1, O: 4 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico Na-SO₄, enlaces covalentes S-O"
    },
    {
        formula: "NH₄Cl",
        nombre: "Cloruro de Amonio",
        elementosNecesarios: { N: 1, H: 4, Cl: 1 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico NH₄-Cl, enlaces covalentes N-H"
    },
    {
        formula: "C₆H₆",
        nombre: "Benceno",
        elementosNecesarios: { C: 6, H: 6 },
        tipoEnlace: "Covalente No Polar",
        detallesEnlace: "Anillo aromático con enlaces C-C deslocalizados y enlaces C-H simples"
    },
    // --- Nuevos 30 compuestos adicionales ---
    {
        formula: "H₂S",
        nombre: "Sulfuro de Hidrógeno",
        elementosNecesarios: { H: 2, S: 1 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Dos enlaces simples H-S"
    },
    {
        formula: "HBr",
        nombre: "Bromuro de Hidrógeno",
        elementosNecesarios: { H: 1, Br: 1 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Un enlace simple H-Br"
    },
    {
        formula: "HI",
        nombre: "Yoduro de Hidrógeno",
        elementosNecesarios: { H: 1, I: 1 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Un enlace simple H-I"
    },
    {
        formula: "LiCl",
        nombre: "Cloruro de Litio",
        elementosNecesarios: { Li: 1, Cl: 1 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "KF",
        nombre: "Fluoruro de Potasio",
        elementosNecesarios: { K: 1, F: 1 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "Na₂O",
        nombre: "Óxido de Sodio",
        elementosNecesarios: { Na: 2, O: 1 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "MgO",
        nombre: "Óxido de Magnesio",
        elementosNecesarios: { Mg: 1, O: 1 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "AlCl₃",
        nombre: "Cloruro de Aluminio",
        elementosNecesarios: { Al: 1, Cl: 3 },
        tipoEnlace: "Covalente Polar", // Aunque tiene carácter iónico, es predominantemente covalente
        detallesEnlace: "Tres enlaces simples Al-Cl"
    },
    {
        formula: "FeCl₃",
        nombre: "Cloruro de Hierro(III)",
        elementosNecesarios: { Fe: 1, Cl: 3 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "CuSO₄",
        nombre: "Sulfato de Cobre(II)",
        elementosNecesarios: { Cu: 1, S: 1, O: 4 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico Cu-SO₄, enlaces covalentes S-O"
    },
    {
        formula: "ZnCl₂",
        nombre: "Cloruro de Zinc",
        elementosNecesarios: { Zn: 1, Cl: 2 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "AgCl",
        nombre: "Cloruro de Plata",
        elementosNecesarios: { Ag: 1, Cl: 1 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "PbS",
        nombre: "Sulfuro de Plomo(II)",
        elementosNecesarios: { Pb: 1, S: 1 },
        tipoEnlace: "Iónico",
        detallesEnlace: "Transferencia de electrones"
    },
    {
        formula: "BaSO₄",
        nombre: "Sulfato de Bario",
        elementosNecesarios: { Ba: 1, S: 1, O: 4 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico Ba-SO₄, enlaces covalentes S-O"
    },
    {
        formula: "Ca(OH)₂",
        nombre: "Hidróxido de Calcio",
        elementosNecesarios: { Ca: 1, O: 2, H: 2 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico Ca-(OH)₂, enlaces covalentes O-H"
    },
    {
        formula: "Mg(OH)₂",
        nombre: "Hidróxido de Magnesio",
        elementosNecesarios: { Mg: 1, O: 2, H: 2 },
        tipoEnlace: "Iónico y Covalente Polar",
        detallesEnlace: "Enlace iónico Mg-(OH)₂, enlaces covalentes O-H"
    },
    {
        formula: "H₂CO₃",
        nombre: "Ácido Carbónico",
        elementosNecesarios: { H: 2, C: 1, O: 3 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Enlaces simples C-O, O-H y un doble enlace C=O"
    },
    {
        formula: "CH₃COOH",
        nombre: "Ácido Acético",
        elementosNecesarios: { C: 2, H: 4, O: 2 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Enlaces simples C-C, C-H, C-O y un doble enlace C=O"
    },
    {
        formula: "C₃H₈",
        nombre: "Propano",
        elementosNecesarios: { C: 3, H: 8 },
        tipoEnlace: "Covalente No Polar",
        detallesEnlace: "Dos enlaces simples C-C, ocho enlaces simples C-H"
    },
    {
        formula: "C₄H₁₀",
        nombre: "Butano",
        elementosNecesarios: { C: 4, H: 10 },
        tipoEnlace: "Covalente No Polar",
        detallesEnlace: "Tres enlaces simples C-C, diez enlaces simples C-H"
    },
    {
        formula: "C₆H₁₄",
        nombre: "Hexano",
        elementosNecesarios: { C: 6, H: 14 },
        tipoEnlace: "Covalente No Polar",
        detallesEnlace: "Cinco enlaces simples C-C, catorce enlaces simples C-H"
    },
    {
        formula: "C₁₂H₂₂O₁₁",
        nombre: "Sacarosa",
        elementosNecesarios: { C: 12, H: 22, O: 11 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Múltiples enlaces simples C-C, C-H, C-O, O-H"
    },
    {
        formula: "H₂S",
        nombre: "Ácido Sulfhídrico",
        elementosNecesarios: { H: 2, S: 1 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Dos enlaces simples H-S"
    },
    {
        formula: "PCl₃",
        nombre: "Tricloruro de Fósforo",
        elementosNecesarios: { P: 1, Cl: 3 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Tres enlaces simples P-Cl"
    },
    {
        formula: "SF₆",
        nombre: "Hexafluoruro de Azufre",
        elementosNecesarios: { S: 1, F: 6 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Seis enlaces simples S-F"
    },
    {
        formula: "XeF₂",
        nombre: "Difluoruro de Xenón",
        elementosNecesarios: { Xe: 1, F: 2 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Dos enlaces simples Xe-F"
    },
    {
        formula: "KrF₂",
        nombre: "Difluoruro de Kriptón",
        elementosNecesarios: { Kr: 1, F: 2 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Dos enlaces simples Kr-F"
    },
    {
        formula: "N₂O₄",
        nombre: "Tetraóxido de Dinitrógeno",
        elementosNecesarios: { N: 2, O: 4 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Un enlace simple N-N, enlaces dobles y simples N-O"
    },
    {
        formula: "C₃H₆O",
        nombre: "Acetona",
        elementosNecesarios: { C: 3, H: 6, O: 1 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Dos enlaces simples C-C, seis enlaces simples C-H, un doble enlace C=O"
    },
    {
        formula: "C₆H₅Cl",
        nombre: "Clorobenceno",
        elementosNecesarios: { C: 6, H: 5, Cl: 1 },
        tipoEnlace: "Covalente Polar",
        detallesEnlace: "Anillo aromático con enlaces C-C deslocalizados, enlaces C-H simples y un enlace C-Cl"
    }
];
