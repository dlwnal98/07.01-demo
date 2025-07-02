"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, User, Bot, RefreshCw, CheckCircle, XCircle, BookOpen, FileText, Tag } from "lucide-react"

interface SectionData {
  title: string
  content: any
  loading: boolean
}

interface KeywordData {
  recommended: Array<{ keyword: string; count: number }>
  prohibited: Array<{ keyword: string; count: number }>
}

interface ConsultationKnowledge {
  title: string
  content: string
  category: string
}

interface ConsultationType {
  id: number
  type: string
  description: string
  selected: boolean
}

export default function MainDashboard() {
  const [sections, setSections] = useState<Record<string, SectionData>>({
    chat: { title: "실시간 채팅", content: null, loading: false },
    keywords: { title: "키워드 (추천+금지)", content: null, loading: false },
    knowledge: { title: "추천 상담지식", content: null, loading: false },
    summary: { title: "상담 요약", content: null, loading: false },
    consultationType: { title: "추천 상담유형", content: null, loading: false },
  })

  const handleApiCall = async (sectionKey: string) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], loading: true },
    }))

    // Simulate API call
    setTimeout(() => {
      const mockResponses = {
        chat: [
          {
            id: 1,
            type: "user",
            message: "안녕하세요! 오늘 날씨는 어떤가요?",
            timestamp: "10:30",
          },
          {
            id: 2,
            type: "bot",
            message: "안녕하세요! 오늘은 맑고 화창한 날씨입니다. 기온은 22도 정도로 쾌적합니다.",
            timestamp: "10:31",
          },
          {
            id: 3,
            type: "user",
            message: "좋네요! 산책하기 좋은 날씨군요.",
            timestamp: "10:32",
          },
          {
            id: 4,
            type: "bot",
            message: "네, 맞습니다! 오늘 같은 날씨에는 야외 활동을 하시기에 정말 좋을 것 같아요.",
            timestamp: "10:33",
          },
          {
            id: 5,
            type: "user",
            message: "내일 날씨는 어떤가요?",
            timestamp: "10:34",
          },
          {
            id: 6,
            type: "user",
            message: "비가 많이 내린다는 말이 있는데 어떤가요?",
            timestamp: "10:35",
          },
          {
            id: 7,
            type: "bot",
            message: "내일은 비가 많이 내릴 것 같아요.",
            timestamp: "10:36",
          },
        ],
        keywords: {
          recommended: [
            { keyword: "날씨", count: 5 },
            { keyword: "산책", count: 2 },
            { keyword: "야외활동", count: 1 },
            { keyword: "기온", count: 1 },
          ],
          prohibited: [
            { keyword: "비관적", count: 0 },
            { keyword: "불만", count: 0 },
            { keyword: "화남", count: 0 },
          ],
        },
        knowledge: [
          {
            title: "날씨 정보 안내",
            content:
              "고객이 날씨에 대해 문의할 때는 정확한 기상 정보를 제공하고, 야외 활동 추천 시 안전 주의사항도 함께 안내해주세요.",
            category: "일반 상담",
          },
          {
            title: "야외 활동 추천 가이드",
            content:
              "날씨가 좋을 때 추천할 수 있는 야외 활동: 산책, 조깅, 피크닉, 자전거 타기 등. 자외선 차단제 사용을 권장해주세요.",
            category: "생활 정보",
          },
          {
            title: "우천 시 대안 활동",
            content: "비가 올 때는 실내 활동을 추천하고, 우산이나 우비 준비를 안내해주세요.",
            category: "날씨 대응",
          },
        ],
        summary: `📋 상담 요약

🕐 상담 시간: 2025년 1월 2일 10:30 - 10:36 (6분)
👤 고객 유형: 일반 문의

📝 주요 내용:
• 고객이 오늘과 내일 날씨에 대해 문의
• 야외 활동(산책)에 대한 관심 표현
• 내일 비 예보에 대한 확인 요청

💡 상담 결과:
• 오늘 날씨 정보 제공 완료
• 야외 활동 추천 완료
• 내일 우천 예보 안내 완료

⭐ 고객 만족도: 높음
🎯 후속 조치: 없음`,

        consultationType: [
          {
            id: 1,
            type: "날씨상담 > 상담유형 > 상담일정 예약 문의",
            description: "상담 일정 예약 관련",
            selected: true,
          },
          {
            id: 2,
            type: "날씨상담 > 날씨기능의 확인 > 병원 진료 가능 날짜 문의",
            description: "날씨 기능 확인",
            selected: true,
          },
          {
            id: 3,
            type: "날씨상담 > 기타",
            description: "기타 날씨 관련 문의",
            selected: false,
          },
          {
            id: 4,
            type: "불만접수 > 진료시간 > 운영 시간 문의",
            description: "운영시간 관련 불만",
            selected: false,
          },
        ],
      }

      setSections((prev) => ({
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          content: mockResponses[sectionKey as keyof typeof mockResponses],
          loading: false,
        },
      }))
    }, 1500)
  }

  const renderKeywordSection = () => {
    if (sections.keywords.loading) {
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              추천 키워드
            </h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-6 w-16" />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              금지 키워드
            </h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-16" />
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (!sections.keywords.content) {
      return (
        <div className="flex items-center justify-center h-full text-slate-400">
          <div className="text-center">
            <Tag className="h-12 w-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm">
              키워드 분석을 시작하려면
              <br />
              데이터 불러오기를 클릭하세요
            </p>
          </div>
        </div>
      )
    }

    const keywordData = sections.keywords.content as KeywordData
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-green-700 mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            추천 키워드
          </h3>
          <div className="flex flex-wrap gap-2">
            {keywordData.recommended.map((item, index) => (
              <Badge key={index} variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                {item.keyword} ({item.count})
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-red-700 mb-3 flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            금지 키워드
          </h3>
          <div className="flex flex-wrap gap-2">
            {keywordData.prohibited.map((item, index) => (
              <Badge key={index} variant="secondary" className="bg-red-50 text-red-700 border-red-200">
                {item.keyword} ({item.count})
              </Badge>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderKnowledgeSection = () => {
    if (sections.knowledge.loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b pb-4">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-3/4 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      )
    }

    if (!sections.knowledge.content) {
      return (
        <div className="flex items-center justify-center h-full text-slate-400">
          <div className="text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm">
              상담 지식을 불러오려면
              <br />
              데이터 불러오기를 클릭하세요
            </p>
          </div>
        </div>
      )
    }

    const knowledgeData = sections.knowledge.content as ConsultationKnowledge[]
    return (
      <div className="space-y-4">
        {knowledgeData.map((item, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <h4 className="font-medium text-sm text-slate-900 mb-2">{item.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.content}</p>
            <div className="text-xs text-slate-400">
              상담지식 &gt; {item.category} &gt; {item.title}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderSummarySection = () => {
    if (sections.summary.loading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mb-3" />
          <p className="text-sm text-slate-600">상담 내용을 요약하고 있습니다...</p>
        </div>
      )
    }

    if (!sections.summary.content) {
      return (
        <div className="flex items-center justify-center h-full text-slate-400">
          <div className="text-center">
            <FileText className="h-12 w-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm">
              상담 요약을 생성하려면
              <br />
              데이터 불러오기를 클릭하세요
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="border-b pb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-slate-600">• 상담일시:</span>
            <span className="text-xs text-slate-700">2025-05-07</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-slate-600">• 고객명:</span>
            <span className="text-xs text-slate-700">홍길동</span>
          </div>
        </div>

        <div className="border-b pb-2">
          <div className="text-xs font-medium text-slate-600 mb-2">• 상담유형:</div>
          <div className="text-xs text-slate-700 pl-2">날씨상담 &gt; 상담유형 &gt; 시설/수질 상담일정 예약 문의</div>
        </div>

        <div className="border-b pb-2">
          <div className="text-xs font-medium text-slate-600 mb-2">• 상담내용:</div>
          <div className="text-xs text-slate-700 pl-2">
            고객이 ○○성형외과 등 수질 상담을 위한 금요일 오후 예약을 요청함.
          </div>
        </div>

        <div className="border-b pb-2">
          <div className="text-xs font-medium text-slate-600 mb-2">• 조치내용:</div>
          <div className="text-xs text-slate-700 pl-2">
            금요일 오후 3시 상담 예약 완료. 상담 하루 전 안내 문자 발송 예정.
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-600 mb-2">• 상담결과:</div>
          <div className="text-xs text-slate-700 pl-2">예약 완료 및 안내 조치 완료</div>
        </div>
      </div>
    )
  }

  const renderConsultationTypeSection = () => {
    if (sections.consultationType.loading) {
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-slate-600 border-b pb-2">
            <div className="col-span-1">NO</div>
            <div className="col-span-11">유형</div>
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="grid grid-cols-12 gap-2 py-2">
              <div className="col-span-1">
                <Skeleton className="h-4 w-4" />
              </div>
              <div className="col-span-11">
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (!sections.consultationType.content) {
      return (
        <div className="flex items-center justify-center h-full text-slate-400">
          <div className="text-center">
            <Tag className="h-12 w-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm">
              상담 유형을 분석하려면
              <br />
              데이터 불러오기를 클릭하세요
            </p>
          </div>
        </div>
      )
    }

    const consultationTypes = sections.consultationType.content as ConsultationType[]
    return (
      <div className="space-y-1">
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-slate-600 border-b pb-2 mb-3">
          <div className="col-span-1">NO</div>
          <div className="col-span-11">유형</div>
        </div>
        {consultationTypes.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-2 py-2 bg-slate-100 rounded hover:cursor-pointer">
            <div className="col-span-1 text-center text-sm font-medium">{item.id}</div>
            <div className="col-span-11">
              <div className="text-sm text-slate-600 font-medium">
                {item.selected && "날씨상담 > "}상담유형 &gt; {item.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderChatSection = () => {
    if (sections.chat.loading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mb-3" />
          <p className="text-sm text-slate-600">채팅을 불러오고 있습니다...</p>
        </div>
      )
    }

    if (!sections.chat.content) {
      return (
        <div className="flex items-center justify-center h-full text-slate-400">
          <div className="text-center">
            <Bot className="h-12 w-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm">
              채팅을 시작하려면
              <br />
              채팅 불러오기를 클릭하세요
            </p>
          </div>
        </div>
      )
    }

    const chatMessages = sections.chat.content as Array<{
      id: number
      type: string
      message: string
      timestamp: string
    }>

    return (
      <>
        <div className="px-4 py-2 mb-3 bg-slate-50 border-b">
          <p className="text-xs text-slate-500 text-center">2025년 1월 2일 목요일</p>
        </div>
        <div
          className="flex-1 px-4 overflow-y-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="space-y-4 pb-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.type === "user" ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {msg.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`max-w-[80%] ${msg.type === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block p-3 rounded-2xl ${
                      msg.type === "user"
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-slate-100 text-slate-900 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 px-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">상담 관리 대시보드</h1>
          <p className="text-slate-600">실시간 상담 분석 및 관리 시스템</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Chat Section - Left */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="h-full flex flex-col shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h2 className="text-lg font-semibold text-slate-900">실시간 대화</h2>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-auto w-auto p-2 hover:bg-slate-100"
                  onClick={() => handleApiCall("chat")}
                  disabled={sections.chat.loading}
                >
                  {sections.chat.loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      채팅 불러오기
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">{renderChatSection()}</CardContent>
            </Card>
          </div>

          {/* Right Side - 2x2 Grid */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Keywords Section - Top Left */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h2 className="text-lg font-semibold text-slate-900">{sections.keywords.title}</h2>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-auto w-auto p-2 hover:bg-slate-100"
                  onClick={() => handleApiCall("keywords")}
                  disabled={sections.keywords.loading}
                >
                  {sections.keywords.loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      데이터 불러오기
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">{renderKeywordSection()}</ScrollArea>
              </CardContent>
            </Card>

            {/* Summary Section - Top Right */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h2 className="text-lg font-semibold text-slate-900">{sections.summary.title}</h2>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-auto w-auto p-2 hover:bg-slate-100"
                  onClick={() => handleApiCall("summary")}
                  disabled={sections.summary.loading}
                >
                  {sections.summary.loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      데이터 불러오기
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">{renderSummarySection()}</ScrollArea>
              </CardContent>
            </Card>

            {/* Knowledge Section - Bottom Left */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h2 className="text-lg font-semibold text-slate-900">{sections.knowledge.title}</h2>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-auto w-auto p-2 hover:bg-slate-100"
                  onClick={() => handleApiCall("knowledge")}
                  disabled={sections.knowledge.loading}
                >
                  {sections.knowledge.loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      데이터 불러오기
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">{renderKnowledgeSection()}</ScrollArea>
              </CardContent>
            </Card>

            {/* Consultation Type Section - Bottom Right */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <h2 className="text-lg font-semibold text-slate-900">{sections.consultationType.title}</h2>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-auto w-auto p-2 hover:bg-slate-100"
                  onClick={() => handleApiCall("consultationType")}
                  disabled={sections.consultationType.loading}
                >
                  {sections.consultationType.loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      데이터 불러오기
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">{renderConsultationTypeSection()}</ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
