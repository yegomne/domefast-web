"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState<"URL" | "UPLOAD">("URL");
  
  const [originalTitle, setOriginalTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [loadingStep, setLoadingStep] = useState(0); // 0: none, 1: text parsing, 2: image processing
  const [errorMSG, setErrorMSG] = useState("");

  const [resultText, setResultText] = useState<any>(null);
  const [resultImg, setResultImg] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const resetAll = () => {
    setLoadingStep(0);
    setErrorMSG("");
    setResultText(null);
    setResultImg(null);
  };

  const handleRun = async () => {
    if (!apiKey) {
      setErrorMSG("사이드바에 Gemini API Key를 입력해주세요.");
      return;
    }
    setErrorMSG("");
    setLoadingStep(1);
    setResultText(null);
    setResultImg(null);

    try {
      let targetTitle = originalTitle;
      let targetFileBlob: Blob | null = file;

      // 1. URL 모드면 스크래핑부터
      if (mode === "URL") {
        if (!url) {
          setErrorMSG("URL을 입력해주세요.");
          setLoadingStep(0);
          return;
        }
        const scrapeRes = await fetch("http://localhost:8000/api/scrape", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        if (!scrapeRes.ok) throw new Error("URL 스크래핑 실패");
        const scrapeData = await scrapeRes.json();
        targetTitle = scrapeData.title;
        
        // Base64 to Blob
        if (scrapeData.image) {
          const res = await fetch(scrapeData.image);
          targetFileBlob = await res.blob();
        }
      }

      if (!targetTitle || !targetFileBlob) {
        throw new Error("상품명 또는 썸네일을 확인할 수 없습니다.");
      }

      // 2. 텍스트 최적화 실행
      const textRes = await fetch("http://localhost:8000/api/optimize-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: apiKey, original_title: targetTitle }),
      });
      if (!textRes.ok) throw new Error("텍스트 최적화 실패 (API Key 확인)");
      const textData = await textRes.json();
      setResultText(textData);
      
      // 텍스트 먼저 화면에 띄우기 위해 Step 이동
      setLoadingStep(2);

      // 3. 이미지 백그라운드 구동 (rembg)
      const formData = new FormData();
      formData.append("file", targetFileBlob, "thumbnail.jpg");
      formData.append("optimized_title", textData.optimized_titles?.[0] || "상품");

      const imgRes = await fetch("http://localhost:8000/api/process-image", {
        method: "POST",
        body: formData,
      });
      if (!imgRes.ok) throw new Error("이미지 처리 실패");
      const imgData = await imgRes.json();
      
      setResultImg(imgData.image);
      setLoadingStep(0);

    } catch (e: any) {
      setErrorMSG(e.message || "처리 중 에러가 발생했습니다.");
      setLoadingStep(0);
    }
  };

  return (
    <div className="flex min-h-screen relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-primary opacity-5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-outline-variant opacity-10 blur-[100px] pointer-events-none" />

      {/* 사이드바 */}
      <div className="w-[320px] glass-nav p-10 flex flex-col pt-16 z-10 shadow-xl border-r border-[#ffffff]/20">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-xs font-bold tracking-[0.15em] text-on-surface-variant font-inter">
            CONFIGURATION
          </h2>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 bg-surface-lowest rounded-full shadow-sm text-lg hover:scale-110 transition-transform"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-sm text-on-background font-bold tracking-tight">Gemini API Key</label>
          <div className="ghost-input-container rounded-t-md px-3">
            <input
              type="password"
              className="bg-transparent py-4 text-sm w-full outline-none text-on-background placeholder:text-outline-variant font-medium"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="🔑 Enter your AI key"
            />
          </div>
          <p className="text-xs text-on-surface-variant mt-2 font-medium bg-surface-lowest/50 p-2.5 rounded-lg border border-white/40">
            API 키는 귀하의 로컬 환경에만 유지됩니다.
          </p>
        </div>
      </div>

      {/* 메인 영역 */}
      <div className="flex-1 p-12 lg:px-24 overflow-y-auto z-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <h1 className="text-[3.5rem] leading-tight font-extrabold mb-4 text-on-background tracking-tighter">
              소싱 최적화 <span className="text-primary">파이프라인</span>
            </h1>
            <p className="text-xl text-on-surface-variant font-medium tracking-tight">Gemini 3.1 Flash Lite와 Rembg 기술을 활용한 자동화 대시보드</p>
          </div>

          <div className="flex flex-col xl:flex-row gap-12">
            
            {/* 입력 파트 */}
            <div className="flex-[1.1] flex flex-col gap-6">
              <div className="glass-card p-12 flex flex-col gap-12 border-0">
                <div className="flex gap-2 bg-surface-container/40 p-1.5 rounded-full w-fit border border-white/50">
                  <button 
                    onClick={() => setMode("URL")}
                    className={`text-sm py-2.5 px-7 rounded-full font-bold transition-all duration-300 ${mode === "URL" ? "primary-gradient shadow-lg shadow-primary/20" : "text-on-surface-variant hover:text-on-background hover:bg-white/60"}`}
                  >
                    🔗 URL 스크래핑
                  </button>
                  <button 
                    onClick={() => setMode("UPLOAD")}
                    className={`text-sm py-2.5 px-7 rounded-full font-bold transition-all duration-300 ${mode === "UPLOAD" ? "primary-gradient shadow-lg shadow-primary/20" : "text-on-surface-variant hover:text-on-background hover:bg-white/60"}`}
                  >
                    📁 직접 업로드
                  </button>
                </div>

                {mode === "URL" ? (
                  <div className="flex flex-col gap-4">
                    <label className="text-base text-on-background font-extrabold tracking-tight">도매꾹/도매매 상품 URL</label>
                    <div className="ghost-input-container rounded-t-lg px-2">
                      <input
                        type="text"
                        className="bg-transparent py-4 text-lg outline-none w-full text-on-background font-inter placeholder:text-outline-variant px-2"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://domeme.domeggook.com/..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-10">
                    <div>
                      <label className="text-base text-on-background font-extrabold tracking-tight block mb-4">상품 썸네일</label>
                      <div
                        onDragOver={(e) => { e.preventDefault(); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                            setFile(e.dataTransfer.files[0]);
                          }
                        }}
                        className="border-[3px] border-dashed border-outline-variant/60 hover:border-primary/80 rounded-[2rem] p-12 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer bg-surface-low/30 hover:bg-surface-lowest/80 group"
                        onClick={() => document.getElementById("fileInput")?.click()}
                      >
                        <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 text-4xl">
                          📥
                        </div>
                        <p className="text-lg font-bold text-on-background mb-2">
                          {file ? file.name : "이미지를 드래그하거나 클릭하여 업로드"}
                        </p>
                        <p className="text-sm font-medium text-on-surface-variant">지원 형식: PNG, JPG, WEBP (최대 5MB)</p>
                        <input 
                          id="fileInput"
                          type="file" 
                          className="hidden" 
                          accept="image/jpeg, image/png, image/webp"
                          onChange={(e) => setFile(e.target.files?.[0] || null)} 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-base text-on-background font-extrabold tracking-tight block mb-4">원본 상품명</label>
                      <div className="ghost-input-container rounded-t-lg px-2">
                        <input
                          type="text"
                          className="bg-transparent py-4 text-lg outline-none w-full text-on-background placeholder:text-outline-variant px-2 shadow-none"
                          value={originalTitle}
                          onChange={(e) => setOriginalTitle(e.target.value)}
                          placeholder="어떤 상품인가요?"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {errorMSG && (
                  <div className="bg-[#fff0f4] border border-[#ffcddc] text-[#b41340] text-sm p-4 rounded-xl flex items-center gap-3 font-bold">
                    <span className="text-lg">⚠️</span> {errorMSG}
                  </div>
                )}

                <div className="flex gap-4 mt-4 w-full">
                  <button
                    onClick={handleRun}
                    disabled={loadingStep > 0}
                    className="flex-[3] primary-gradient py-6 rounded-2xl font-extrabold text-xl hover:shadow-[0_20px_40px_rgba(8,70,237,0.3)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 text-white tracking-widest relative overflow-hidden group"
                  >
                    {loadingStep > 0 ? "최적화 궤도 진입 중..." : "START OPTIMIZATION  🚀"}
                    {loadingStep === 0 && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />}
                  </button>
                  <button
                    onClick={() => {
                      setUrl("");
                      setOriginalTitle("");
                      setFile(null);
                      resetAll();
                    }}
                    className="flex-[1] bg-surface-low text-on-surface-variant py-6 rounded-2xl font-bold text-lg hover:bg-white hover:text-on-background hover:shadow-sm border border-transparent hover:border-outline-variant/30 transition-all flex items-center justify-center"
                  >
                    초기화
                  </button>
                </div>
              </div>
            </div>

            {/* 출력 파트 */}
            <div className="flex-[0.9] flex flex-col">
              {loadingStep === 1 && (
                <div className="glass-card p-12 flex flex-col items-center justify-center text-on-surface-variant h-full min-h-[500px] animate-in fade-in duration-500">
                  <div className="relative mb-8">
                     <div className="w-20 h-20 border-4 border-primary/20 rounded-full"></div>
                     <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                  <h3 className="text-2xl font-extrabold text-on-background mb-3 tracking-tight">AI 텍스트 분석 중</h3>
                  <p className="text-base font-medium">최적의 SEO 키워드를 추출하고 있습니다...</p>
                </div>
              )}
              
              {resultText && (
                <div className="glass-card p-12 flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out border-0">
                  <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
                    <h3 className="text-3xl font-extrabold text-on-background tracking-tight">분석 리포트</h3>
                    <div className="px-4 py-1.5 bg-green-100 text-green-700 text-xs font-extrabold rounded-full uppercase tracking-widest shadow-sm">
                      Done
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-surface-lowest/60 p-7 rounded-3xl flex flex-col gap-3 relative group hover:bg-white hover:shadow-lg transition-all duration-300 border border-white/50 cursor-default">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-primary" />
                         <span className="text-xs font-extrabold text-primary uppercase tracking-[0.1em]">추천 카테고리</span>
                      </div>
                      <p className="text-on-background font-bold text-xl">{resultText.category}</p>
                    </div>
                    
                    <div className="bg-surface-lowest/60 p-7 rounded-3xl flex flex-col gap-3 relative group hover:bg-white hover:shadow-lg transition-all duration-300 border border-white/50 cursor-default">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-primary" />
                         <span className="text-xs font-extrabold text-primary uppercase tracking-[0.1em]">SEO 검색 태그</span>
                      </div>
                      <p className="text-on-background font-medium leading-relaxed text-base">{resultText.search_tags}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 pt-2">
                    <div className="flex items-center gap-2 pl-1">
                       <span className="text-xs font-extrabold text-on-surface-variant uppercase tracking-[0.15em]">추천 상품명 (택 1)</span>
                       <div className="h-[1px] flex-1 bg-outline-variant/20 ml-2" />
                    </div>
                    <div className="flex flex-col gap-4">
                      {resultText.optimized_titles?.map((title: string, idx: number) => (
                        <div key={idx} className="p-6 bg-white shadow-sm rounded-2xl text-on-background font-bold text-lg hover:shadow-md hover:border-primary/50 border border-outline-variant/20 transition-all cursor-copy group relative hover:-translate-y-0.5">
                          <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-sm text-primary font-bold transition-all bg-primary/10 px-3 py-1.5 rounded-lg">복사하기</span>
                          {title}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 이미지 영역 */}
                  <div className="mt-4 pt-10 border-t border-outline-variant/20">
                    <div className="flex justify-between items-end mb-6">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-primary" />
                         <span className="text-xs font-extrabold text-primary uppercase tracking-[0.1em]">정제된 썸네일 (1000x1000)</span>
                      </div>
                      {resultImg && (
                        <a href={resultImg} download="optimized_thumbnail.jpg" className="inline-flex items-center gap-1.5 text-primary text-sm font-bold hover:bg-primary/5 px-4 py-2 rounded-full transition-colors border border-transparent hover:border-primary/20">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                          다운로드
                        </a>
                      )}
                    </div>
                    
                    {loadingStep === 2 ? (
                      <div className="w-full aspect-square bg-surface-low/50 rounded-[2rem] flex flex-col items-center justify-center text-on-surface-variant border border-outline-variant/20 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-lowest/70 to-transparent animate-[shimmer_2s_infinite] -skew-x-12" />
                        <div className="relative mb-6 z-10">
                           <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
                           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                        </div>
                        <p className="text-base font-extrabold text-on-background z-10">AI 구도 보정 및 누끼 제거 중...</p>
                        <p className="text-sm mt-2 font-medium z-10 bg-white/50 px-3 py-1 rounded-full">Rembg Engine Active</p>
                      </div>
                    ) : resultImg ? (
                      <div className="w-full relative aspect-square rounded-[2rem] overflow-hidden bg-white shadow-[0_24px_48px_rgba(43,42,81,0.06)] border border-surface-container group">
                        <Image src={resultImg} alt="Processed Thumbnail" fill className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem] pointer-events-none" />
                      </div>
                    ) : null}
                  </div>

                  {(!loadingStep && resultImg) && (
                    <button onClick={resetAll} className="w-full mt-2 py-5 rounded-2xl text-on-surface-variant hover:text-on-background hover:bg-white hover:shadow-sm border border-transparent hover:border-outline-variant/30 transition-all font-bold tracking-wide flex items-center justify-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                      새로운 소싱 작업 시작
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
