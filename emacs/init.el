

;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.

;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.

;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.

;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.

;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.

;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.

;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.

;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.

;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.

;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.

;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.
(package-initialize)

(package-initialize)

(package-initialize)

(package-initialize)

(package-initialize)

(package-initialize)

(package-initialize)

(package-initialize)

(package-initialize)

(package-initialize)

(package-initialize)

(package-initialize)

(require 'package)

;; Add melpa package source when using package list
(add-to-list 'package-archives '("org" . "http://orgmode.org/elpa/") t)
(add-to-list 'package-archives '("melpa" . "http://melpa.org/packages/") t)

;; Load emacs packages and activate them
;; This must come before configurations of installed packages.
;; Don't delete this line.
(package-initialize)

(defun open-init-file ()
  "Open init file"
  (interactive)
  (find-file "c:/emacs/.emacs.d/init.el")
)


(defun xah-dired-sort ()
  "Sort dired dir listing in different ways.
Prompt for a choice.
URL 'http://ergoemacs.org/emacs/dired_sort.html'
Version 2015-07-30"
  (interactive)
  (let (-sort-by -arg)
    (setq -sort-by (ido-completing-read "Sort by:" '( "date" "size"
                                                      "name" "dir")))
    (cond
     ((equal -sort-by "name") (setq -arg "-Al --si --time-style long-iso "))
     ((equal -sort-by "date") (setq -arg "-Al --si --time-style long-iso -t"))
     ((equal -sort-by "size") (setq -arg "-Al --si --time-style long-iso -S"))
     ((equal -sort-by "dir") (setq -arg "-Al --si --time-style long-iso --group-directories-first"))
     (t (error "logic error 09535" )))
    (dired-sort-other -arg)))
(require 'dired ) ;; use the same buff for viewing directory
(define-key dired-mode-map (kbd "RET") 'dired-find-alternate-file) ; was dired-advertised-find-file                 
(define-key dired-mode-map (kbd "^") (lambda () (interactive) (find-alternate-file "..")))  ; was dired-up-directory
(define-key dired-mode-map (kbd "s") 'xah-dired-sort)


(fset 'yes-or-no-p 'y-or-n-p) ; 快捷y/n 回复
(global-linum-mode 1) ; always show line numbers
(add-to-list 'load-path "c:/emacs/.emacs.d/Fill-Column-Indicator/")
(require 'fill-column-indicator)  ;; run M-x fci
(setq fci-rule-column 80)
(setq fci-rule-width 1)
(setq fci-rule-color "darkorchid")

(add-to-list 'auto-mode-alist '("\\.js\\'" . js2-mode))

(global-set-key (kbd "M-p") 'ace-window)
;; web-mode
(add-to-list 'load-path "~/.emacs.d/web-mode/")
(load "web-mode")
(require 'web-mode)
(add-to-list 'auto-mode-alist '("\\.phtml\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.html\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.tpl\\.php\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.[agj]sp\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.as[cp]x\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.erb\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.mustache\\'" . web-mode))
(add-to-list 'auto-mode-alist '("\\.djhtml\\'" . web-mode))

(defun my-web-mode-hook ()
  "Hooks for Web mode."
  (setq web-mode-markup-indent-offset 2)
  (setq web-mode-css-indent-offset 2)
  (setq web-mode-code-indent-offset 2)
)
(add-hook 'web-mode-hook  'my-web-mode-hook)

;;;;;;;;;;;;;;;;;;;;

(setq default-directory "c:/Users/tom/desktop/" )
(setq display-time-24hr-format t)
(setq display-time-day-and-date t);;时间显示包括日期和具体时间
(display-time-mode t)

;;设置窗口位置为屏库左上角(0,0)
(set-frame-position (selected-frame) 290 50)
;;设置宽和高,我的十寸小本是110,33,大家可以调整这个参数来适应自己屏幕大小
(set-frame-width (selected-frame) 85)
(set-frame-height (selected-frame) 38)

;; Setting English Font
(set-face-attribute
 'default nil :font "Ubuntu Mono-13")
;; Setting Chinese Font
(dolist (charset '(kana han symbol cjk-misc bopomofo))
  (set-fontset-font (frame-parameter nil 'font)
            charset
            (font-spec :family "Microsoft yahei" :size 16)))
(setq default-buffer-file-coding-system 'utf-8)
(prefer-coding-system 'utf-8)

;; company-mode
(add-hook 'after-init-hook 'global-company-mode)
(require 'company)
(setq company-idle-delay .3)                         ; decrease delay before autocompletion popup shows
(setq company-begin-commands '(self-insert-command)) ; start autocompletion only after typing
(define-key company-mode-map (kbd "C--") 'company-filter-candidates)
(setq company-tooltip-margin 2)


;; wangyin ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(setq visible-bell t)
(setq inhibit-startup-message t)
(setq column-number-mode t)
(setq mouse-yank-at-point t)
(setq kill-ring-max 200)
(setq-default fill-column 60)
(setq-default indent-tabs-mode nil)
(setq scroll-margin 3
      scroll-conservatively 10000)
(show-paren-mode t)
(setq show-paren-style 'parentheses)
(setq sentence-end "\\([。！？]\\|……\\|[.?!][]\"')}]*\\($\\|[ \t]\\)\\)[ \t\n]*")
(setq sentence-end-double-space nil)
(setq enable-recursive-minibuffers t)
(setq default-major-mode 'text-mode)
;;;;;;;;;;;;;;;;;;;;;;;;;
(add-to-list 'load-path "~/.emacs.d/paredit")
(autoload 'paredit-mode "paredit"
  "Minor mode for pseudo-structurally editing Lisp code."
  t)

(mouse-avoidance-mode 'animate)
(setq frame-title-format "emacs@%b")
(auto-image-file-mode)
(global-font-lock-mode t)
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;;;;;;;;;;;
;; Scheme 
;;;;;;;;;;;;

(require 'cmuscheme)
(setq scheme-program-name "petite")         ;; 如果用 Petite 就改成 "petite"


;; bypass the interactive question and start the default interpreter
(defun scheme-proc ()
  "Return the current Scheme process, starting one if necessary."
  (unless (and scheme-buffer
               (get-buffer scheme-buffer)
               (comint-check-proc scheme-buffer))
    (save-window-excursion
      (run-scheme scheme-program-name)))
  (or (scheme-get-process)
      (error "No current process. See variable `scheme-buffer'")))

(defun scheme-split-window ()
  (cond
   ((= 1 (count-windows))
    (delete-other-windows)
    (split-window-vertically (floor (* 0.68 (window-height))))
    (other-window 1)
    (switch-to-buffer "*scheme*")
    (other-window 1))
   (;(not (find "*scheme*"
     ;          (mapcar (lambda (w) (buffer-name (window-buffer w)))
      ;                 (window-list))
                                        ;        :test 'equal))
    (> 2 1)
    (other-window 1)
    (switch-to-buffer "*scheme*")
    (other-window -1))))

(defun scheme-send-last-sexp-split-window ()
  (interactive)
  (scheme-split-window)
  (scheme-send-last-sexp))

(defun scheme-send-definition-split-window ()
  (interactive)
  (scheme-split-window)
  (scheme-send-definition))

(add-hook 'paredit-mode-hook
  (lambda ()
    (local-set-key (kbd "<f5>") 'scheme-send-last-sexp-split-window)
    (local-set-key (kbd "<f6>") 'scheme-send-definition-split-window)))
(add-hook 'scheme-mode-hook
  (lambda ()
    (local-set-key (kbd "<f5>") 'scheme-send-last-sexp-split-window)
    (local-set-key (kbd "<f6>") 'scheme-send-definition-split-window)))
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(add-to-list 'load-path "~/.emacs.d/color-theme-solarized/")
(require 'color-theme)
(require 'color-theme-solarized)
;(color-theme-solarized)

(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(column-number-mode t)
 '(custom-enabled-themes (quote (solarized)))
 '(custom-safe-themes
   (quote
    ("fa2b58bb98b62c3b8cf3b6f02f058ef7827a8e497125de0254f56e373abee088" "8db4b03b9ae654d4a57804286eb3e332725c84d7cdab38463cb6b97d5762ad26" default)))
 '(display-time-mode t)
 '(ecb-options-version "2.50")
 '(ecb-source-path
   (quote
    (#("c:/Users/tom/Desktop/program" 0 28
       (help-echo "Mouse-2 toggles maximizing, mouse-3 displays a popup-menu")))))
 '(menu-bar-mode nil)
 '(package-selected-packages
   (quote
    (tabbar highlight-parentheses ecb org org-transform-tree-table web-completion-data spacemacs-theme silkworm-theme js2-mode dash company color-theme ace-window)))
 '(show-paren-mode t)
 '(tool-bar-mode nil)
 '(tooltip-mode nil))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
(put 'dired-find-alternate-file 'disabled nil)
