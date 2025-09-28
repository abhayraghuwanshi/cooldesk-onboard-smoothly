// import { AlertCircle, ArrowRight, Bookmark, Bot, Chrome, Clock, FileText, FolderOpen, Folders, Frown, Lightbulb, Palette, Rocket, Search, Zap } from "lucide-react";
// import { HeroButton, SecondaryButton } from "./ui/button-variants";

// export const Hero = () => {
//   return (
//     <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden w-full">
//       {/* Glassmorphic background effects - Full viewport coverage */}
//       <div className="absolute inset-0 w-screen bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
//       <div className="absolute top-10 left-5 w-72 h-72 bg-gradient-to-r from-primary/30 to-accent/25 rounded-full blur-3xl animate-float" />
//       <div className="absolute bottom-10 right-5 w-96 h-96 bg-gradient-to-r from-accent/25 to-tech-cyan/20 rounded-full blur-3xl animate-pulse delay-1000" />
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-tech-purple/8 to-primary/8 rounded-full blur-[120px] animate-pulse delay-500" />

//       {/* Extended background coverage */}
//       <div className="absolute inset-0 w-screen bg-gradient-to-r from-background/20 via-transparent to-background/20 pointer-events-none" />

//       <div className="relative z-10 container mx-auto px-6 w-full max-w-7xl">
//         <div className="max-w-6xl mx-auto">
//           {/* Hook Hero - Problem-First */}
//           <div className="text-center mb-16 animate-slide-up">
//             <div className="inline-flex items-center gap-2 glass border-red-500/30 rounded-full px-4 py-2 mb-6 hover:shadow-glow transition-all duration-300">
//               <AlertCircle className="h-4 w-4 text-red-400 animate-pulse" />
//               <span className="text-sm font-medium text-red-400">Browser Chaos Alert</span>
//             </div>

//             <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-red-300 to-foreground bg-clip-text text-transparent">
//               Drowning in
//               <span className="block text-red-400">Browser Chaos?</span>
//             </h1>

//             <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
//               Your bookmarks are a disaster. Tabs multiply like rabbits. Important research gets lost in the void.
//               <span className="text-primary font-semibold block mt-2">Sound familiar?</span>
//             </p>
//           </div>

//           {/* Problem Visualization */}
//           <div className="grid md:grid-cols-3 gap-6 mb-16">
//             <div className="glass-card rounded-2xl p-6 text-center group hover:border-red-400/30 hover:-translate-y-2 transition-all duration-300">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-400/20 to-red-500/20 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
//                 <Clock className="h-8 w-8 text-red-400 group-hover:scale-110 transition-transform duration-300" />
//               </div>
//               <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-red-400 transition-colors duration-300">2.5 Hours Lost Daily</h3>
//               <p className="text-sm text-muted-foreground">Average time wasted on poor browser organization</p>
//             </div>
//             <div className="glass-card rounded-2xl p-6 text-center group hover:border-red-400/30 hover:-translate-y-2 transition-all duration-300">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-400/20 to-red-500/20 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
//                 <Search className="h-8 w-8 text-red-400 group-hover:scale-110 transition-transform duration-300" />
//               </div>
//               <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-red-400 transition-colors duration-300">73% Can't Find</h3>
//               <p className="text-sm text-muted-foreground">Of bookmarked content when they need it</p>
//             </div>
//             <div className="glass-card rounded-2xl p-6 text-center group hover:border-red-400/30 hover:-translate-y-2 transition-all duration-300">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-400/20 to-red-500/20 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
//                 <Folders className="h-8 w-8 text-red-400 group-hover:scale-110 transition-transform duration-300" />
//               </div>
//               <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-red-400 transition-colors duration-300">500+ Bookmarks</h3>
//               <p className="text-sm text-muted-foreground">Average researcher has with zero organization</p>
//             </div>
//           </div>

//           {/* Solution Reveal */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 hover:shadow-glow transition-all duration-300">
//               <Chrome className="h-4 w-4 text-primary animate-pulse" />
//               <span className="text-sm font-medium text-primary">Powered by Advanced Technology</span>
//             </div>

//             <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
//               Three Pillars of
//               <span className="block text-primary">Productivity Power</span>
//             </h2>

//             <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
//               Meet <span className="text-primary font-semibold">CoolDesk</span> - combining cutting-edge AI, advanced workspace management,
//               and universal search to transform chaos into <span className="text-primary font-semibold">organized productivity</span>
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
//               <HeroButton className="group glass-button border-primary/30 shadow-glow hover:shadow-primary/40">
//                 <Chrome className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
//                 Transform My Browser
//                 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//               </HeroButton>
//               <SecondaryButton className="glass-button">
//                 See 2-Minute Demo
//               </SecondaryButton>
//             </div>
//           </div>

//           {/* Hero Visual - Enhanced Before/After Split */}
//           <div className="relative max-w-6xl mx-auto">
//             <div className="grid lg:grid-cols-2 gap-8">
//               {/* Before - Chaos */}
//               <div className="glass-card rounded-3xl p-8 group hover:border-red-400/30 transition-all duration-500 relative overflow-hidden">
//                 {/* Chaotic background pattern */}
//                 <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
//                   <div className="absolute top-4 left-4 w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
//                   <div className="absolute top-8 right-6 w-2 h-2 bg-red-500 rounded-full animate-pulse delay-300"></div>
//                   <div className="absolute bottom-6 left-8 w-4 h-4 bg-red-300 rounded-full animate-bounce delay-700"></div>
//                   <div className="absolute bottom-4 right-4 w-2 h-2 bg-red-600 rounded-full animate-pulse delay-1000"></div>
//                 </div>

//                 <div className="relative z-10">
//                   <div className="flex items-center justify-center mb-6">
//                     <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400/20 to-red-600/20 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
//                       <AlertCircle className="h-8 w-8 text-red-400 group-hover:scale-110 transition-transform duration-300" />
//                     </div>
//                   </div>

//                   <h3 className="text-2xl font-bold text-red-400 mb-6 text-center group-hover:text-red-300 transition-colors duration-300">
//                     Before: Browser Chaos
//                   </h3>

//                   <div className="space-y-4">
//                     {[
//                       { icon: FileText, text: "47 tabs open, can't find anything", delay: "0ms" },
//                       { icon: Bookmark, text: "Bookmarks scattered everywhere", delay: "150ms" },
//                       { icon: Search, text: "Lost research, duplicated effort", delay: "300ms" },
//                       { icon: FolderOpen, text: "No way to organize by project", delay: "450ms" }
//                     ].map((item, index) => {
//                       const IconComponent = item.icon;
//                       return (
//                         <div
//                           key={index}
//                           className="flex items-center gap-4 p-3 rounded-xl hover:bg-red-400/5 transition-all duration-300 group/item"
//                           style={{ animationDelay: item.delay }}
//                         >
//                           <div className="w-8 h-8 rounded-lg bg-red-400/10 flex items-center justify-center group-hover/item:bg-red-400/20 group-hover/item:scale-110 transition-all duration-300">
//                             <IconComponent className="h-4 w-4 text-red-400" />
//                           </div>
//                           <span className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">
//                             {item.text}
//                           </span>
//                           <div className="w-2 h-2 bg-red-400 rounded-full ml-auto animate-pulse"></div>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   <div className="mt-6 text-center">
//                     <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-red-400/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-400/20 transition-all duration-300">
//                       <Frown className="h-6 w-6 text-red-400" />
//                     </div>
//                     <p className="text-sm text-red-400/80">Complete Chaos</p>
//                   </div>
//                 </div>
//               </div>

//               {/* After - Organized */}
//               <div className="glass-card rounded-3xl p-8 group hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
//                 {/* Organized background pattern */}
//                 <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
//                   <div className="absolute top-4 left-4 w-16 h-2 bg-primary/30 rounded-full"></div>
//                   <div className="absolute top-8 left-4 w-12 h-2 bg-accent/30 rounded-full"></div>
//                   <div className="absolute top-12 left-4 w-20 h-2 bg-tech-cyan/30 rounded-full"></div>
//                   <div className="absolute bottom-8 right-4 w-14 h-2 bg-primary/30 rounded-full"></div>
//                   <div className="absolute bottom-4 right-4 w-18 h-2 bg-accent/30 rounded-full"></div>
//                 </div>

//                 <div className="relative z-10">
//                   <div className="flex items-center justify-center mb-6">
//                     <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
//                       <Chrome className="h-8 w-8 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
//                     </div>
//                   </div>

//                   <h3 className="text-2xl font-bold text-primary mb-6 text-center group-hover:text-accent transition-colors duration-300">
//                     After: CoolDesk Power
//                   </h3>

//                   <div className="space-y-4">
//                     {[
//                       { icon: Bot, text: "AI-organized workspaces by project", delay: "0ms" },
//                       { icon: Zap, text: "Universal search finds anything instantly", delay: "150ms" },
//                       { icon: Lightbulb, text: "Smart suggestions for what to revisit", delay: "300ms" },
//                       { icon: Palette, text: "Beautiful themes, fully customizable", delay: "450ms" }
//                     ].map((item, index) => {
//                       const IconComponent = item.icon;
//                       return (
//                         <div
//                           key={index}
//                           className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 group/item"
//                           style={{ animationDelay: item.delay }}
//                         >
//                           <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover/item:bg-primary/20 group-hover/item:scale-110 transition-all duration-300">
//                             <IconComponent className="h-4 w-4 text-primary" />
//                           </div>
//                           <span className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">
//                             {item.text}
//                           </span>
//                           <div className="w-2 h-2 bg-primary rounded-full ml-auto animate-pulse"></div>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   <div className="mt-6 text-center">
//                     <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
//                       <Rocket className="h-6 w-6 text-primary" />
//                     </div>
//                     <p className="text-sm text-primary/80">Pure Productivity</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* VS Divider */}
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
//               <div className="glass-card rounded-full w-16 h-16 flex items-center justify-center border-primary/30 hover:shadow-glow transition-all duration-300">
//                 <span className="text-primary font-bold text-lg">VS</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };