//fake data test //Home
const fetchCaseTest = (searchTermS, searchTermE) => {
    let szSCreateDTime = searchTermS ? searchTermS.replaceAll('-', '') : '';
    let szECreateDTime = searchTermE ? searchTermE.replaceAll('-', '') : '';
    console.log(`heressss get range ${szSCreateDTime} to ${szECreateDTime}`)
    let data1 = [
        { "Id": 2, "Vhno": "Case01", "CreateTime": "20210924093816032", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "Case01_src.png", "RefFileName": "Case01_ref.png", "Description": "測試", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210924093816035" },
        { "Id": 6, "Vhno": "a6d3048f-4b77-4a3b-bda2-5993254f6ed4", "CreateTime": "20210927155949084", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "a6d3048f-4b77-4a3b-bda2-5993254f6ed4_src.png", "RefFileName": "a6d3048f-4b77-4a3b-bda2-5993254f6ed4_ref.png", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210927155949084" },
        { "Id": 7, "Vhno": "a0f3762a-d2ad-42eb-b23d-ca9a11ff5b24", "CreateTime": "20210928123959969", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "a0f3762a-d2ad-42eb-b23d-ca9a11ff5b24_src.png", "RefFileName": "a0f3762a-d2ad-42eb-b23d-ca9a11ff5b24_ref.png", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210928123959969" },
        { "Id": 8, "Vhno": "72eb23c0-a7c5-426c-bb11-86dd02b26c16", "CreateTime": "20210928125023245", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "72eb23c0-a7c5-426c-bb11-86dd02b26c16_src.png", "RefFileName": "72eb23c0-a7c5-426c-bb11-86dd02b26c16_ref.png", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210928125023245" },
        { "Id": 9, "Vhno": "276d8729-ca07-44f9-ac6b-55bfbfe6dd46", "CreateTime": "20210928132637615", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "276d8729-ca07-44f9-ac6b-55bfbfe6dd46_src.png", "RefFileName": "276d8729-ca07-44f9-ac6b-55bfbfe6dd46_ref.png", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210928132637615" },
        { "Id": 10, "Vhno": "a2600e5a-e72c-4fd3-ae93-9605f0018127", "CreateTime": "20210928135039322", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "a2600e5a-e72c-4fd3-ae93-9605f0018127_src.pdf", "RefFileName": "a2600e5a-e72c-4fd3-ae93-9605f0018127_ref.pdf", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210928135039323" },
        { "Id": 11, "Vhno": "feec2a38-c469-42ea-93f6-1884c2c721cb", "CreateTime": "20210928140714799", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "feec2a38-c469-42ea-93f6-1884c2c721cb_src.pdf", "RefFileName": "feec2a38-c469-42ea-93f6-1884c2c721cb_ref.pdf", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210928140714800" },
        { "Id": 12, "Vhno": "c8db963f-c4ba-4630-a59b-7f506355833d", "CreateTime": "20210929085319001", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "c8db963f-c4ba-4630-a59b-7f506355833d_src.pdf", "RefFileName": "c8db963f-c4ba-4630-a59b-7f506355833d_ref.pdf", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20210929085319002" },
        { "Id": 13, "Vhno": "44d539a9-fd67-4772-a3a7-031e1ca326a2", "CreateTime": "20211006101731145", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "44d539a9-fd67-4772-a3a7-031e1ca326a2_src.png", "RefFileName": "44d539a9-fd67-4772-a3a7-031e1ca326a2_ref.png", "Description": "FDFD", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20211006101731146" },
        { "Id": 14, "Vhno": "b6a8393b-89c9-4761-8f15-5cdbe3721f6e", "CreateTime": "20211027134150672", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "b6a8393b-89c9-4761-8f15-5cdbe3721f6e_src.png", "RefFileName": "b6a8393b-89c9-4761-8f15-5cdbe3721f6e_ref.png", "Description": "", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20211027134150673" },
        { "Id": 15, "Vhno": "068e4609-9a5c-4357-8d96-eb6b2b4535bc", "CreateTime": "20211028142203775", "CreateEmp": "N000000930", "Co": "XD", "Dp": "", "SrcFileName": "068e4609-9a5c-4357-8d96-eb6b2b4535bc_src.png", "RefFileName": "068e4609-9a5c-4357-8d96-eb6b2b4535bc_ref.png", "Description": "test", "Email": "N000000930@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000000930", "Txtm": "20211028142203776" },
        { "Id": 16, "Vhno": "a2aa78b8-a675-4905-a8f7-517c2836fe5e", "CreateTime": "20211118120029405", "CreateEmp": "N000126091", "Co": "XD", "Dp": "", "SrcFileName": "a2aa78b8-a675-4905-a8f7-517c2836fe5e_src.pdf", "RefFileName": "a2aa78b8-a675-4905-a8f7-517c2836fe5e_ref.pdf", "Description": "", "Email": "N000126091@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000126091", "Txtm": "20211118120029406" },
        { "Id": 17, "Vhno": "52f6dde0-6d04-4f3b-aad6-fa3f71474f02", "CreateTime": "20211118120147498", "CreateEmp": "N000126091", "Co": "XD", "Dp": "", "SrcFileName": "52f6dde0-6d04-4f3b-aad6-fa3f71474f02_src.pdf", "RefFileName": "52f6dde0-6d04-4f3b-aad6-fa3f71474f02_ref.pdf", "Description": "", "Email": "N000126091@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000126091", "Txtm": "20211118120147499" },
        { "Id": 18, "Vhno": "9450f592-f41f-4409-86d9-6d0ab1619519", "CreateTime": "20211202160215389", "CreateEmp": "N000126091", "Co": "XD", "Dp": "", "SrcFileName": "9450f592-f41f-4409-86d9-6d0ab1619519_src.png", "RefFileName": "9450f592-f41f-4409-86d9-6d0ab1619519_ref.png", "Description": "", "Email": "N000126091@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000126091", "Txtm": "20211202160215392" },
        { "Id": 19, "Vhno": "e90b4f36-0811-46a1-8e29-50688b2ad5d2", "CreateTime": "20211202160302306", "CreateEmp": "N000126091", "Co": "XD", "Dp": "", "SrcFileName": "e90b4f36-0811-46a1-8e29-50688b2ad5d2_src.png", "RefFileName": "e90b4f36-0811-46a1-8e29-50688b2ad5d2_ref.png", "Description": "", "Email": "N000126091@FPG", "Result": "Y", "Report": null, "StopMk": "N", "Txemp": "N000126091", "Txtm": "20211202160302306" }
    ];
    setData(data1);
    console.log(`heres get fake data ${data1}`)
    setSDate(searchTermS);
    setEDate(searchTermE);
};
//fake data test //apiContext
const fetchPageListTest = () => {
    console.log(`here gets caseNo: ${caseNo} & createDTime: ${createDTime}`);
    let data = [
        {
            "Page": 0,
            "FilePathSets": [
                "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
                "http://upload.wikimedia.org/wikipedia/commons/3/32/EVD_Document1.jpg",
                "https://web-tuts.com/abc_content/uploads/2021/01/jQuery-Get-Image-Src-and-Set-Image-Src.fw-min-750x445.png",
                "https://c0.wallpaperflare.com/preview/104/979/585/india-sikkim-lake-mountent-thumbnail.jpg",
                "https://w0.peakpx.com/wallpaper/370/878/HD-wallpaper-hogwarts-express-potter-harry-viaduct-glenfinnan.jpg",
            ],
            "Sets": [
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 28, "Y": 50, "Width": 232, "Height": 54 }, "Page": 0, "BoxIndex": 1, "OcrSSIM": 1.0, "SrcText": "MeDiPro", "RefText": "MeDiPro", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 570, "Y": 52, "Width": 132, "Height": 30 }, "Page": 0, "BoxIndex": 2, "OcrSSIM": 0.375, "SrcText": "保存侏什2-8C", "RefText": "(保存條件2-", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 481, "Y": 59, "Width": 76, "Height": 42 }, "Page": 0, "BoxIndex": 3, "OcrSSIM": 0.0, "SrcText": "WD", "RefText": "IL", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 280, "Y": 66, "Width": 194, "Height": 36 }, "Page": 0, "BoxIndex": 4, "OcrSSIM": 1.0, "SrcText": "AC-00013-05", "RefText": "AC-00013-05", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 576, "Y": 76, "Width": 76, "Height": 36 }, "Page": 0, "BoxIndex": 5, "OcrSSIM": 0.4, "SrcText": "10 ml", "RefText": " 10 n", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 130, "Y": 98, "Width": 40, "Height": 12 }, "Page": 0, "BoxIndex": 6, "OcrSSIM": "-Infinity", "SrcText": "", "RefText": "Diagno", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 9, "Y": 116, "Width": 392, "Height": 66 }, "Page": 0, "BoxIndex": 7, "OcrSSIM": 0.95652173913043481, "SrcText": "Antibody screening cell", "RefText": "Anfibody screening cell", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 0, "Y": 162, "Width": 142, "Height": 115 }, "Page": 0, "BoxIndex": 8, "OcrSSIM": -1.0, "SrcText": "I", "RefText": "III", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 127, "Y": 187, "Width": 236, "Height": 42 }, "Page": 0, "BoxIndex": 9, "OcrSSIM": 0.84615384615384615, "SrcText": "血球濃度 : 3i0.5%", "RefText": "血球濃度 : 3+0. 5%", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 379, "Y": 205, "Width": 72, "Height": 40 }, "Page": 0, "BoxIndex": 10, "OcrSSIM": 0.25, "SrcText": "Lot:", "RefText": "L", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 379, "Y": 255, "Width": 63, "Height": 45 }, "Page": 0, "BoxIndex": 11, "OcrSSIM": 0.0, "SrcText": "Exp", "RefText": "臼", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 315, "Y": 318, "Width": 439, "Height": 53 }, "Page": 0, "BoxIndex": 12, "OcrSSIM": -1.5833333333333335, "SrcText": "日里土醫科枝服份有呎公司", "RefText": "oawosk Ho MebicAt fedhNotosyfo昂", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 318, "Y": 356, "Width": 436, "Height": 32 }, "Page": 0, "BoxIndex": 13, "OcrSSIM": 0.0, "SrcText": "FORMU5A BloMtDICAL TEGHHotn6y CORI", "RefText": "", "Pass": false }
            ],
            "PassSets": [
                {
                    "Page": 0,
                    "BoxIndex": 2,
                    "Pass": true,
                },
                {
                    "Page": 0,
                    "BoxIndex": 5,
                    "Pass": true,
                },
            ]
        }, {
            "Page": 1,
            "FilePathSets": [
                "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
                "http://upload.wikimedia.org/wikipedia/commons/3/32/EVD_Document1.jpg",
                "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
                "http://upload.wikimedia.org/wikipedia/commons/3/32/EVD_Document1.jpg",
                "https://i.epochtimes.com/assets/uploads/2021/11/id13392306-3526-2021-11-23-093833.jpg",
            ],
            "Sets": [
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 28, "Y": 50, "Width": 232, "Height": 54 }, "Page": 0, "BoxIndex": 1, "OcrSSIM": 1.0, "SrcText": "MeDiPro", "RefText": "MeDiPro", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 570, "Y": 52, "Width": 132, "Height": 30 }, "Page": 0, "BoxIndex": 2, "OcrSSIM": 0.375, "SrcText": "保存侏什2-8C", "RefText": "(保存條件2-", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 481, "Y": 59, "Width": 76, "Height": 42 }, "Page": 0, "BoxIndex": 3, "OcrSSIM": 0.0, "SrcText": "WD", "RefText": "IL", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 280, "Y": 66, "Width": 194, "Height": 36 }, "Page": 0, "BoxIndex": 4, "OcrSSIM": 1.0, "SrcText": "AC-00013-05", "RefText": "AC-00013-05", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 576, "Y": 76, "Width": 76, "Height": 36 }, "Page": 0, "BoxIndex": 5, "OcrSSIM": 0.4, "SrcText": "10 ml", "RefText": " 10 n", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 130, "Y": 98, "Width": 40, "Height": 12 }, "Page": 0, "BoxIndex": 6, "OcrSSIM": "-Infinity", "SrcText": "", "RefText": "Diagno", "Pass": false },
                { "Index": 0, "Ssim": 0.0, "Qatm_score": 0.0, "Rect": { "X": 9, "Y": 116, "Width": 392, "Height": 66 }, "Page": 0, "BoxIndex": 7, "OcrSSIM": 0.95652173913043481, "SrcText": "Antibody screening cell", "RefText": "Anfibody screening cell", "Pass": false },
            ],
            "PassSets": [
                {
                    "Page": 0,
                    "BoxIndex": 2,
                    "Pass": true,
                },
                {
                    "Page": 0,
                    "BoxIndex": 5,
                    "Pass": true,
                },
                {
                    "Page": 0,
                    "BoxIndex": 6,
                    "Pass": true,
                },
                {
                    "Page": 0,
                    "BoxIndex": 7,
                    "Pass": true,
                },
            ]
        }
    ];
    for (let i = 0; i < data.length; i++) {
        data[i].PassSets.forEach(PassSet => {
            const isPass = (element) => element.BoxIndex === PassSet.BoxIndex;
            let passIndex = data[0].Sets.findIndex(isPass);
            if (passIndex !== -1) {
                data[i].Sets[passIndex].Pass = true;
            }
        });
    }
    console.log(`heres get fake pages ${data}`)
    // setPages({ caseNo: caseNo, createDTime: createDTime, pageList: data });
    dispatch({ type: 'fetch_success', caseNo: caseNo, createDTime: createDTime, pageList: data })
};