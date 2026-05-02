'use client';

import { useState } from 'react';
import { ArrowRight, Download, Zap, Image as ImageIcon, Search, Cpu, AlertCircle, Info, PlayCircle, XCircle, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Auroras / Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 80, -80, 0],
          y: [0, 40, -40, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[20%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          x: [0, -120, 120, 0],
          y: [0, -80, 80, 0],
          scale: [1, 0.9, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] right-[10%] w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          x: [0, 50, -50, 0],
          y: [0, 100, -100, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] left-[40%] w-[400px] h-[400px] bg-pink-500/10 dark:bg-amber-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
      />
      
      {/* Premium Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]"></div>
    </div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const ApiGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 md:mt-16 mb-10 z-20 relative px-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-base sm:text-lg font-extrabold text-slate-800 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 transition-all active:scale-[0.98] flex items-center w-full py-5 sm:py-6 px-5 sm:px-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl border-2 border-purple-200 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-500 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.2)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative"
      >
        <div className="absolute left-5 sm:left-8 flex items-center h-full">
          <span className="text-2xl sm:text-3xl animate-bounce origin-bottom">🔑</span>
        </div>
        
        <div className="mx-auto text-center px-10 sm:px-12 flex-1 break-keep">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text mr-1">
            [필독]
          </span>
          제미나이 무료 API 발급받고 프로그램에 넣는 방법 (초간단!)
        </div>

        <div className="absolute right-5 sm:right-8 flex items-center h-full">
          <svg className={`w-6 h-6 text-purple-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 border-2 border-purple-100 dark:border-slate-700 mt-3 rounded-2xl text-left text-sm text-slate-700 dark:text-slate-300 shadow-2xl">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">✨</span> 초등학생도 따라하는 3분 완성 가이드
              </h3>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">1</div>
                  <div>
                    <p className="font-bold text-base text-slate-900 dark:text-slate-100"><strong className="text-blue-600 dark:text-blue-400">구글 AI 스튜디오</strong> 접속하기</p>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">아래 파란색 버튼을 눌러서 구글 제미나이 사이트로 이동하세요. (구글 로그인이 필요해요!)</p>
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="inline-block mt-3 text-white font-bold bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl transition-colors shadow-sm">
                      👉 구글 AI 스튜디오 열기 (클릭)
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">2</div>
                  <div>
                    <p className="font-bold text-base text-slate-900 dark:text-slate-100"><strong className="text-rose-500">API 키 만들기</strong> 버튼 클릭!</p>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">화면 왼쪽 메뉴에서 <strong className="text-rose-500 font-bold bg-rose-50 dark:bg-rose-900/20 px-1 rounded">Get API key</strong>를 클릭하고, 파란색 <strong className="text-rose-500 font-bold bg-rose-50 dark:bg-rose-900/20 px-1 rounded">Create API key</strong> 버튼을 눌러주세요.</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">3</div>
                  <div>
                    <p className="font-bold text-base text-slate-900 dark:text-slate-100">나만의 <strong className="text-amber-500">비밀번호(API 키)</strong> 생성</p>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">화면에 뜬 <strong className="text-amber-600 dark:text-amber-400 font-bold">Create API key in new project</strong> 버튼을 한번 더 누르면 잠시 뒤 쨘! 엄청 길고 복잡한 영어+숫자가 나와요.</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">4</div>
                  <div>
                    <p className="font-bold text-base text-slate-900 dark:text-slate-100">복사해서 <strong className="text-purple-600 dark:text-purple-400">도매매 자동화 앱</strong>에 넣기 🚀</p>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">방금 만든 긴 글자 아래에 있는 <strong className="text-slate-800 dark:text-slate-200 font-bold bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded shadow-sm border border-slate-200 dark:border-slate-600">Copy</strong> 버튼을 누르세요. 그리고 다운받은 우리 프로그램 환경설정 창에 붙여넣기(`Ctrl+V`)를 하면 끝입니다!</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                {/* Info 1 */}
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/50 flex items-start gap-3">
                  <Info className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed break-keep">
                    <strong className="text-[15px]">왜 번거롭게 내 API 키를 직접 넣어야 하나요? 🤔</strong><br className="mb-1" />
                    제미나이는 나만의 <strong className="text-purple-600 dark:text-purple-400 font-bold">주민등록증(API 키)</strong>이 필요해요! 내 PC에서 내 키로 로봇을 직접 부려먹으니까 <strong>비싼 중간 서버 비용이 0원!</strong> 그래서 이 도매매 자동화 앱을 통째로 <strong>평생 100% 무료</strong>로 배포할 수 있는 거랍니다! 😊
                  </p>
                </div>

                {/* Info 2 */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed break-keep">
                    <strong className="text-[15px]">얼마나 쓸 수 있나요? (무료 한도) 🎁</strong><br className="mb-1" />
                    가장 성능과 속도 밸런스가 좋은 최신 <strong className="text-blue-600 dark:text-blue-400 font-bold">Gemini 3 Flash (Preview)</strong> 모델이 무료로 제공됩니다. 1인 셀러 기준 하루 종일 펑펑 써도 남는 넉넉한 일일 한도를 제공하지만, <strong className="text-rose-500 font-medium">1분당 최대 10~15회(RPM) 호출 제한</strong>이 있으므로 한 번에 너무 많은 버튼을 광클하지 않도록 주의해 주세요!
                  </p>
                </div>

                {/* Info 3 - Warning */}
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800/50 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed break-keep">
                    <strong className="text-[15px] text-rose-600 dark:text-rose-400">🚨 경고! API 키 절대 유출 주의!</strong><br className="mb-1" />
                    API 키는 <strong>내 신용카드 비밀번호</strong>와 같아요! 절대 카페나 블로그, 카톡방에 캡처해서 올리지 마세요. 남이 내 키를 훔쳐서 마음대로 써버릴 수 있습니다. <strong className="font-bold underline decoration-rose-300 underline-offset-2">무조건 나 혼자만 조용히 우리 앱 설정창 안에 넣고 쓰셔야 합니다.</strong>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'terms' | 'privacy' | 'legal'>('terms');

  const openModal = (type: 'terms' | 'privacy' | 'legal') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const downloadLink = "https://github.com/yegomne/domefast-web/releases/latest/download/domeggook_tool.exe";
  
  return (
    <div className="min-h-screen bg-app-bg text-app-fg font-sans selection:bg-purple-500/30 relative">
      
      <AnimatedBackground />

      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-app-border/40 relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">도매매 소싱 대시보드</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          <Link href="#features" className="hover:text-amber-600 dark:hover:text-amber-50 transition-colors">기능 소개</Link>
          <Link href="/dashboard" className="hover:text-amber-600 dark:hover:text-amber-50 transition-colors">대시보드 (웹)</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-24 flex flex-col items-center text-center relative z-10">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center w-full"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-app-card/80 backdrop-blur-md border border-app-border/40 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            V1.0 Windows 전용 데스크톱 앱 정식 출시!
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-slate-900 dark:text-white">
            상위 1% 셀러들의<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 dark:from-purple-400 dark:via-pink-400 dark:to-amber-300">
               도매매 소싱 비밀 무기 ⚡
            </span>
          </motion.h1>
          
          <motion.div variants={itemVariants} className="w-full max-w-5xl mx-auto mb-16 relative">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-[800px] h-[300px] bg-purple-500/10 dark:bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 relative z-10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200/60 dark:border-slate-800/60 rounded-[2rem] p-6 sm:p-10 md:p-12 shadow-2xl shadow-indigo-500/5">
              
              {/* Problem Area - Monochromatic & Subdued */}
              <div className="flex flex-col justify-center space-y-6 md:pr-12 md:pl-4 border-b md:border-b-0 md:border-r border-slate-200/60 dark:border-slate-800/60 pb-8 md:py-4 md:pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </span>
                  <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">The Problem</span>
                </div>
                <h3 className="text-[22px] md:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-200 leading-[1.3]">
                  남들과 똑같은 썸네일,<br />의미 없는 최저가 경쟁
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-[1.7] text-base md:text-[17px] break-keep font-medium">
                  도매매 상품을 아직도 그대로 올리시나요? 고객 눈에는 모두 같은 상품으로 보일 뿐입니다. 돌고 돌아 결국 출혈 경쟁만 남게 됩니다.
                </p>
              </div>

              {/* Solution Area - Glowing & Vibrant */}
              <div className="flex flex-col justify-center space-y-6 md:pl-12 md:pr-4 pt-4 md:py-4">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-700/50 shadow-inner">
                    <span className="absolute inset-0 rounded-full animate-ping bg-purple-400 opacity-20 duration-1000"></span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <span className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase">The Solution</span>
                </div>
                <h3 className="text-[22px] md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.3]">
                  단 5초 만에 완성되는<br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 dark:from-purple-400 dark:via-pink-400 dark:to-amber-300">독보적인 브랜드 자산</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-[1.7] text-base md:text-[17px] break-keep font-medium">
                  더 이상 포토샵에 시간 뺏기지 마세요. AI가 완벽하게 재창조한 매출 터지는 상품명과 나만의 썸네일로 상위 1% 마진을 선점하세요.
                </p>
              </div>

            </div>
          </motion.div>

          {/* CTA Text Line */}
          <motion.div variants={itemVariants} className="text-center mb-12 w-full flex justify-center px-4">
            <div className="group relative inline-flex items-center justify-center gap-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 py-3.5 px-6 sm:px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:scale-[1.02] transition-transform">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <p className="text-base md:text-lg font-semibold text-slate-700 dark:text-slate-300 transform-gpu relative z-10 transition-colors">
                지금 바로 <strong className="text-amber-600 dark:text-amber-400 font-extrabold text-lg md:text-xl px-1">평생 100% 무료 앱</strong>으로 차원이 다른 매출을 경험하세요!
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            
            {/* 데스크톱 앱 버튼 */}
            <div className="relative group">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={downloadLink} 
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-shadow shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 relative z-10"
              >
                <Download className="w-5 h-5" />
                무료 다운로드 (.exe)
              </motion.a>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max max-w-[340px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-50">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 shadow-xl backdrop-blur-sm relative text-left">
                  <div className="text-[13px] leading-relaxed text-slate-700 dark:text-slate-300 break-keep">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-blue-500 font-bold shrink-0 mt-[1px]">👍 장점</span>
                      <span>내 PC 자원을 써서 속도가 가장 빠릅니다. 트래픽 제한 없이 <strong className="text-blue-600 dark:text-blue-400">100% 영구 무료</strong>입니다.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 font-bold shrink-0 mt-[1px]">👎 단점</span>
                      <span>Windows (10/11) 환경에서만 사용 가능합니다.</span>
                    </div>
                  </div>
                  {/* 말풍선 꼬리 */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-700/50 rotate-45"></div>
                </div>
              </div>
            </div>

            {/* 대시보드 웹 버튼 */}
            <div className="relative group">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="h-full relative z-10">
                <Link href="/dashboard" className="flex items-center justify-center gap-2 bg-app-card hover:bg-slate-100 dark:hover:bg-slate-800 border border-app-border/60 text-slate-800 dark:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-sm hover:border-slate-400 dark:hover:border-slate-500 h-full w-full">
                  대시보드 웹 버전 <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max max-w-[340px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-50">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 shadow-xl backdrop-blur-sm relative text-left">
                  <div className="text-[13px] leading-relaxed text-slate-700 dark:text-slate-300 break-keep">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-blue-500 font-bold shrink-0 mt-[1px]">👍 장점</span>
                      <span>Mac, 스마트폰 등 기기 상관없이 인터넷만 되면 <strong className="text-blue-600 dark:text-blue-400">무설치로 즉시 사용!</strong></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 font-bold shrink-0 mt-[1px]">👎 단점</span>
                      <span>무료 서버 트래픽 제한 및 이미지 작업 시 딜레이 발생 가능</span>
                    </div>
                  </div>
                  {/* 말풍선 꼬리 */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-700/50 rotate-45"></div>
                </div>
              </div>
            </div>

          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-6 flex flex-col items-center gap-3 w-full">
            <p className="text-sm text-slate-500 font-medium">Windows 10/11 전용 · 용량 387MB · 평생 100% 무료</p>
          </motion.div>
        </motion.div>

        {/* API Guide Section */}
        <ApiGuide />

        {/* Feature Highlights Section */}
        <div id="features" className="w-full mt-16 md:mt-24 flex flex-col relative z-10 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 font-bold tracking-widest text-[11px] mb-4 border border-purple-200 dark:border-purple-500/30">CORE FEATURES</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              수동 등록은 그만, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">3가지 핵심 무기</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">1인 기업가의 시간을 폭발적으로 아껴줄 솔루션</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
            <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-app-card/60 backdrop-blur-xl border border-app-border/40 p-8 rounded-3xl group hover:border-purple-500/50 hover:bg-app-card/80 transition-all shadow-sm"
          >
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6 text-pink-500 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-amber-50">rembg 초고속 누끼 제거</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              복잡한 상품 배경도 AI가 완벽하게 분리합니다. 데스크톱 자원을 활용하여 별도의 클라우드 통신 없이 안전하고 빠르게 투명 배경 이미지를 생성합니다.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-app-card/60 backdrop-blur-xl border border-app-border/40 p-8 rounded-3xl group hover:border-amber-400/50 hover:bg-app-card/80 transition-all shadow-sm"
          >
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6 text-amber-500 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-amber-50">Gemini 3.1 SEO 최적화</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              어설픈 상품명은 그만! 스마트스토어/쿠팡 검색 알고리즘에 완벽 대응하는 최적화 타이틀과 해시태그를 카테고리에 맞게 자동으로 꽂아줍니다.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-app-card/60 backdrop-blur-xl border border-app-border/40 p-8 rounded-3xl group hover:border-blue-400/50 hover:bg-app-card/80 transition-all shadow-sm"
          >
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-amber-50">독립형 완전 자동화 앱</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              도매매 상품 URL 하나만 입력하세요. 정보 크롤링부터 이미지 최적화, 텍스트 가공까지 한 큐에 단일 데스크톱 앱에서 모두 해결됩니다.
            </p>
          </motion.div>
          </div>
        </div>

        {/* Installation Instructions */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl mt-32 flex flex-col gap-6 relative z-10 font-sans"
        >
          {/* Section Header */}
          <div className="text-center mb-6">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold tracking-widest text-[11px] mb-4 border border-blue-200 dark:border-blue-500/30">INSTALLATION GUIDE</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              전문 지식 없이도 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">1분 설치 가이드</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">단 3번의 클릭만으로 나만의 자동화 봇을 구동하세요</p>
          </div>

          {/* Top 3 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Step 1 */}
            <div className="bg-app-card/60 backdrop-blur-xl border border-app-border/40 rounded-[1.5rem] p-8 transition-colors hover:border-purple-500/50 hover:bg-app-card/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center mb-8 border border-purple-200 dark:border-purple-500/30">
                <span className="text-purple-600 dark:text-purple-300 font-mono text-base font-bold">{'>_'}</span>
              </div>
              <div className="text-purple-600 dark:text-purple-400 text-[11px] font-bold tracking-widest mb-3">STEP 01</div>
              <div className="flex items-center gap-2 mb-4">
                <h4 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">설치 파일 실행</h4>
                <span className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] px-1.5 py-0.5 rounded font-bold">주의</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[13px] leading-[1.7] font-medium break-keep">
                다운로드 폴더에서 다운받은 파일을 마우스 오른쪽 버튼으로 누른 후, 반드시 <span className="text-purple-600 dark:text-purple-400 font-semibold">‘관리자 권한으로 실행’</span>을 선택해주세요.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-app-card/60 backdrop-blur-xl border border-app-border/40 rounded-[1.5rem] p-8 transition-colors hover:border-blue-500/50 hover:bg-app-card/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center mb-8 border border-blue-200 dark:border-blue-500/30">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={2.5}/>
              </div>
              <div className="text-blue-600 dark:text-blue-400 text-[11px] font-bold tracking-widest mb-3">STEP 02</div>
              <h4 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight mb-4">'추가 정보' 클릭</h4>
              <p className="text-slate-600 dark:text-slate-400 text-[13px] leading-[1.7] font-medium break-keep">
                Windows 보호 알림 시 안내글 속의 <span className="underline underline-offset-4 decoration-slate-400 dark:decoration-slate-500 text-slate-800 dark:text-slate-300 font-semibold">'추가 정보'</span> 문구를 클릭합니다.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-app-card/60 backdrop-blur-xl border border-app-border/40 rounded-[1.5rem] p-8 transition-colors hover:border-pink-500/50 hover:bg-app-card/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center mb-8 border border-pink-200 dark:border-pink-500/30">
                <PlayCircle className="w-5 h-5 text-pink-600 dark:text-pink-400" strokeWidth={2.5}/>
              </div>
              <div className="text-pink-600 dark:text-pink-400 text-[11px] font-bold tracking-widest mb-3">STEP 03</div>
              <h4 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight mb-4">'실행' 버튼 클릭</h4>
              <p className="text-slate-600 dark:text-slate-400 text-[13px] leading-[1.7] font-medium break-keep">
                우측 하단에 나타나는 '실행' 버튼을 클릭하여 설치를 완료합니다. 즉시 프로그램을 시작할 수 있습니다.
              </p>
            </div>
          </div>

          {/* Bottom Alert Details */}
          <div className="w-full bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20 rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden backdrop-blur-xl text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full"></div>
            
            <div className="relative flex flex-col md:flex-row md:items-start gap-4 mb-8">
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-500">
                <AlertCircle className="w-6 h-6" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white text-[22px] font-bold mb-4 tracking-tight">V3 백신 등에서 알림 메시지가 뜰 때</h3>
                <p className="text-slate-700 dark:text-slate-300 text-[14px] leading-[1.8] font-medium tracking-tight break-keep">
                  도매매자동화는 100% 안전하게 자체 개발된 소프트웨어입니다. 다만, 갓 배포된 최신 프로그램 특성상 V3 같은 백신 프로그램이 '처음 보는 파일'로 인식하여 일시적으로 보안 검사 창을 띄울 수 있습니다. <span className="text-amber-600 dark:text-amber-500 font-bold">바이러스가 아니니 절대 안심하시고</span>, 아래의 간단한 2단계만 진행해 주시면 정상적으로 사용하실 수 있습니다!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              <div className="bg-white/60 dark:bg-black/40 rounded-2xl p-6 border border-amber-500/10">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 text-[11px] font-bold px-2 py-0.5 rounded-sm">1단계</span>
                  <strong className="text-amber-700 dark:text-amber-500 text-[15px] font-bold tracking-tight">[검사 중지] 누르기</strong>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[13px] leading-[1.7] font-medium">
                  '앱 격리 검사 중'이라는 주황색 알림 창이 뜨면 당황하지 마시고, 화면 왼쪽 아래에 있는 [검사 중지] 버튼을 클릭해 주세요.
                </p>
              </div>
              <div className="bg-white/60 dark:bg-black/40 rounded-2xl p-6 border border-amber-500/10">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 text-[11px] font-bold px-2 py-0.5 rounded-sm">2단계</span>
                  <strong className="text-amber-700 dark:text-amber-500 text-[15px] font-bold tracking-tight">[파일 해시 예외 처리] 누르기</strong>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[13px] leading-[1.7] font-medium">
                  이어서 '앱 격리 검사 중지' 화면으로 바뀌면, 왼쪽 아래의 [파일 해시 예외 처리] 버튼을 클릭해 주세요.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Yegom Company Info Footer Template */}
      <footer className="py-16 text-center sm:text-left text-slate-500 mt-20 relative z-20 border-t border-app-border/20 bg-slate-50 dark:bg-black/20 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-8 px-6">
          {/* 1. 필수 사업자 정보 */}
          <div>
            <p className="font-bold text-slate-800 dark:text-slate-300 mb-3">상호명: 예곰 (Yegom)</p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-500">
              대표자명: 박세현 | 사업장 소재지: 서울시 구로구 디지털로32다길 30 301호<br />
              고객센터: yegomne@gmail.com | 사업자등록번호: 201-07-23148<br />
              통신판매업 신고번호: 제 2014-서울구로-0190 호
            </p>
          </div>
          
          {/* 2. 필수 규정 링크 및 카피라이트 */}
          <div className="flex flex-col sm:items-end gap-4 text-xs font-semibold">
            <div className="flex gap-4 mb-2">
              <button onClick={() => openModal('terms')} className="hover:text-slate-900 dark:hover:text-amber-50 transition-colors text-slate-700 dark:text-slate-400">이용약관</button>
              <span className="text-slate-400 dark:text-slate-700">|</span>
              <button onClick={() => openModal('privacy')} className="hover:text-slate-900 dark:hover:text-white transition-colors text-slate-700 dark:text-slate-400">개인정보처리방침</button>
              <span className="text-slate-400 dark:text-slate-700">|</span>
              <button onClick={() => openModal('legal')} className="hover:text-slate-900 dark:hover:text-white transition-colors text-slate-700 dark:text-slate-400">법적 고지</button>
            </div>
            <p className="text-slate-500 dark:text-slate-600 mt-2">© {new Date().getFullYear()} By Yegom. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-app-bg border border-app-border max-w-lg w-full rounded-2xl p-8 relative shadow-2xl"
          >
            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">×</button>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-amber-50">
              {modalType === 'terms' && '이용약관'}
              {modalType === 'privacy' && '개인정보처리방침'}
              {modalType === 'legal' && '법적 고지'}
            </h2>
            <div className="text-base font-medium text-slate-800 dark:text-slate-200 h-64 overflow-y-auto pr-2 custom-scrollbar space-y-4 leading-relaxed tracking-wide">
              {modalType === 'terms' && (
                <>
                  <p><strong>제 1조 (목적)</strong><br/>본 약관은 예곰(이하 '회사')이 제공하는 소프트웨어 및 웹서비스의 이용에 관한 조건 및 절차를 규정합니다.</p>
                  <p><strong>결제 및 환불 규정</strong><br/>본 소프트웨어는 기본적으로 무료 배포되며, 추후 연동되는 부가 유료 서비스 결제 건에 대해서는 디지털 콘텐츠 구동 후 단순 변심 환불이 제한될 수 있습니다.</p>
                  <p>이용자는 서비스 이용 시 대한민국의 통신판매 관련 법적 책임을 준수해야 하며, 상업적 무단 재배포를 엄격히 금합니다.</p>
                </>
              )}
              {modalType === 'privacy' && (
                <>
                  <p><strong>1. 개인정보 수집 항목</strong><br/>본 소프트웨어 구동 시 모든 연산은 사용자 로컬 환경에서만 처리되며, 회사(예곰) 서버로 별도의 개인정보나 분석 데이터를 전송 및 수집하지 않습니다.</p>
                  <p><strong>2. API 키 관리</strong><br/>사용자가 입력한 서드파티(Gemini Google Cloud) API 키 등은 암호화되어 사용자 PC 로컬 스토리지만을 이용하여 보관됩니다.</p>
                  <p><strong>3. 기타</strong><br/>단, 이메일 문의 시 제공된 개인정보는 문의 처리 종료 후 즉각 파기됩니다.</p>
                </>
              )}
              {modalType === 'legal' && (
                <>
                  <p><strong>제한적 면책 조항</strong><br/>본 회사는 사용자가 도매매 등 외부 플랫폼에서 데이터를 스크래핑/가공하여 발생한 저작권, 상표권 분쟁 및 금산법적 이슈에 대해 일체 책임지지 않습니다.</p>
                  <p>모든 데이터 스크래핑 및 상업적 사용 권한은 API를 이용하는 사용자 본인의 책임이며, 본 소프트웨어는 업무 효율성을 높이는 단순 매크로/유틸리티 기능을 제공할 뿐입니다.</p>
                </>
              )}
            </div>
            <button onClick={closeModal} className="mt-8 w-full py-4 bg-slate-200 dark:bg-app-border hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-amber-50 font-bold rounded-xl transition-colors">
              닫기
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
